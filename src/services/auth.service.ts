import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { sign } from 'jsonwebtoken';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';
import { getCustomRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { JWT_SECRET } from './../config/config';
import { Token } from './../entity/token.entity';
import { TokenService } from './token.service';
import { UserService } from './user.service';

export class AuthService {

  private userRepository: UserRepository;
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.tokenService = new TokenService();
    this.userService = new UserService();
  }

  private async getUserSensitives(email: string) {
    if (await this.userRepository.findOne({ where: { email }, select: ['email', 'password'] })) {
      return true;
    }
  }

  async signup(user: User) {
    if (await this.getUserSensitives(user.email)) {
      throw new Error('ALREADY_EXIST');
    }

    // Crypte le password
    user.password = await hash(user.password); // from argon2
    // user.avatar = 'uploads/avatar-1580898492028.png';

    user = this.userRepository.create(user); // Initialisation d'un objet user
    user = await this.userRepository.save(user); // sauvegarder le user

    const token = new Token();
    const tokenString = randomBytes(12).toString('hex');

    token.user = user;
    token.value = tokenString;
    token.expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    this.tokenService.create(token);

    await this.nodemailer(tokenString, user); // envoi de mail

    return true;
  }

  async signIn(email: string, password: string) {

    const labelError = new Error('Invalide crendentials');

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'password', 'email', 'activated', 'username'],
    });

    // Si il n'y a pas eu d'activation de compte, renvoi l'erreur NOT ACTIVE
    // Si il y a activated true => continue la méthode signin
    if (!user?.activated) {
      throw new Error('NOT ACTIVE');
    }

    if (!user) { // Si pas user
      throw labelError;
    }

    const isValid = await verify(user.password, password);
    if (!isValid) {
      throw labelError;
    }

    const secret = JWT_SECRET;
    if (!secret) {
      throw new Error('Pas de secret SETUP');
    }

    delete user.password;

    const token = sign( // from jsonwebtoken
      { id: user.id, username: user.username, email: user.email }, // id, username, role dans sign PAS DE PASSWORD !
      secret); // PrivateKey à entrer comme une variable environnement
    return { token, user };
  }

  // Si le token est confirmé, on appelle la méthode getByvalue qui
  // s'occupe de récupérer le user par le token.
  // Si le userToken n'existe pas : retourne Lien invalide
  // Sinon appelle méthode activUserAccount qui s'occupe de modifier
  // le champs activ dans la table User a TRUE
  async isConfirmed(token: string) {
    const userToken = await this.tokenService.getByValue(token);
    if (!userToken) {
      throw new Error('Token not confirm');
    }
    return await this.userService.activUserAccount(userToken.user);
  }

  private async nodemailer(token: string, user: User) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    const testAccount = await createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address ou adresse mail du nom de domaine
      to: user.email, // list of receivers
      subject: 'Activation link', // Subject linew
      text: 'Hello world?', // plain text body
      html: `<b> Hello ${user.username} <a href="http://localhost:3000/auth/confirmation/${token}">
        Activation link </a>
        </b>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

}
