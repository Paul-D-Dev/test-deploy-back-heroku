import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import { AbstractService } from '../core/abstract.services';
import { CodeRepository } from '../repository/code.repository';
import { Code } from './../entity/code.entity';

/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class CodeService extends AbstractService {

  protected repository = getCustomRepository(CodeRepository);

  async getAll() {
    const winners = await this.repository.find({relations: ['winner'],
                                                where: {isFound: true},
                                                order: {id: 'DESC'}});
    winners.map((winner) => {
      delete winner.winner.email;
      delete winner.winner.password;
      delete winner.winner.role;
      delete winner.winner.isActive;
      winner.winner.lastname = this.reduceLastName(winner.winner.lastname);
    });
    return winners;
  }

  async getWinners() {
    // return await this.repository.find({relations: ['winners'], where: {isFound: true}});
    return await this.repository.find({relations: ['winner']});
  }

  async create() {
    moment.locale('fr');
    const currentDate = moment().format('L'); // DD / MM / YYYY
    const nextDate = moment().add(1, 'day').format('L'); // DD + 1 / MM / YYYY

    const code = await this.repository.findOne({where: {date: currentDate}});
    const nextCode = await this.repository.findOne({where: {date: nextDate}});

    if (!code) {
      this.saveCode(currentDate);
    } else if (!nextCode && code.isFound === true) {
      this.saveCode(nextDate);
    } else {
      throw new Error('CODE ALREADY CREATED');
    }
  }

  // Generate a code with nbPin.
  randomCode(pin: number) {
    const code = [];
    for (let i = 0; i < pin; i++) {
      code.push(Math.floor((Math.random() * 10)));
    }
    return code.join('');
  }

  saveCode(date: string) {
    const code = new Code();
    code.date = date;
    code.response = this.randomCode(4);
    return this.repository.save(code);
  }

  triggerCreateCode() {
    const currentDate = new Date();

    // trigger at Today 20:00
    const trigger = new Date(currentDate.getFullYear(),
                                currentDate.getMonth(),
                                currentDate.getDate(),
                                20, 0, 0, 0).getTime();
    let stopWatch = trigger - currentDate.getTime();

    if (stopWatch < 0) {
      stopWatch += 86400000; // it's after 8pm, try 8pm tomorrow. = + 24h
    }

    setTimeout(() => {
      console.log('20h00 = Nouveau code');
    }, stopWatch);
  }

  reduceLastName(lastname: string) {
    const firstLetter = lastname.charAt(0);
    return firstLetter + '.';
  }

}
