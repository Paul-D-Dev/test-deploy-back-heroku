import { Repository, EntityRepository } from 'typeorm';
import { Sport } from '../entity/sport.entity';
/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requete sql)
 */

@EntityRepository(Sport)
 export class SportRepository extends Repository<Sport> {

}
