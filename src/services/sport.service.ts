import { getCustomRepository } from 'typeorm';
import { SportRepository } from '../repository/sport.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class SportService {

    protected repository = getCustomRepository(SportRepository);

    // Business logic

    getAll() {
        return this.repository.find();
    }

    getById(id: number) {
        return this.repository.findOne(id);
    }

    addSport(sport: any) {
        return this.repository.save(sport);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }
}
