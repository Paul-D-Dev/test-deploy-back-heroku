import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/user.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class UserService {

  protected repository = getCustomRepository(UserRepository);

  async getAll() {
    return await this.repository.find();
  }

  async post(user: any)  {
    console.log(user);
    return await this.repository.save(user);
  }

}

