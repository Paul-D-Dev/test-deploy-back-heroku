import { hash } from 'argon2';
import { getCustomRepository } from 'typeorm';
import { AbstractService } from '../core/abstract.services';
import { User, UserRole } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { TokenRepository } from './../repository/token.repository';

/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class UserService extends AbstractService {

  protected repository = getCustomRepository(UserRepository);
  protected tokenRepository = getCustomRepository(TokenRepository);

  relationsEntities = [];

  async getAll() {
    return await this.repository.find({relations : this.relationsEntities});
  }

  async getByUserInfo(id: number) {
    return await this.repository.findOne(id, {relations : this.relationsEntities});
  }

  async activUserAccount(user: User) {
    user.isActive = true;
    user.role = UserRole.USER;
    const id = user.id;
    const idToken = await this.tokenRepository.findOne({ where: { user: { id } } });

    if (idToken !== undefined) {
      this.tokenRepository.delete(idToken.id);
    }

    return await this.repository.save(user);

  }

  async modifyAUser(id: number, user: any) {
    if (user.password) {
      user.password = await hash(user.password); // from argon2
    }
    const userUpdated = await this.repository.update(id, user);
    return this.repository.findOne(id, {
      select: ['email', 'firstname', 'role', 'isActive', 'avatar', 'id'],
      relations: this.relationsEntities,
    },
    );
  }

}
