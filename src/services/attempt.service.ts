import { getCustomRepository } from 'typeorm';
import { AbstractService } from '../core/abstract.services';
import { Code } from '../entity/code.entity';
import { AttemptRepository } from '../repository/attempt.repository';
import { Attempt } from './../entity/attempt.entity';
import { User } from './../entity/user.entity';
import { CodeRepository } from './../repository/code.repository';

/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class AttemptService extends AbstractService {

  protected repository = getCustomRepository(AttemptRepository);
  protected codeRepository = getCustomRepository(CodeRepository);

  async getAll() {
    return await this.repository.find({relations: ['user']});
  }

  async testCode(attempt: Attempt) {
    // Get a code notFound
    const code = await this.codeRepository.findOne({where: {isFound: false}});
      // Check if the code exist
        // if no => stop
        // if yes => continue
    if (!code) {
      throw new Error('ALREADY FOUND');
    }
    // Check if the attempt already exist by user
      // if no -> Check the code
      // if yes -> Already try among user's attempt
    const verifyAttempt = await this.repository.findOne({
      where : {code: attempt.code, user: attempt.user},
    });

    if (!verifyAttempt) {
      attempt.codeDate = code.date;
      if (attempt.code === code.response) {
          this.codeIsFound(code, attempt.user);
          attempt.isCorrect = true;
          await this.repository.save(attempt);
          return attempt.isCorrect;
      } else {
        if (attempt.user.vip === true) {
          attempt.voices = 2;
          await this.repository.save(attempt);
          return attempt.isCorrect;
        } else {
          await this.repository.save(attempt);
          return attempt.isCorrect;
        }
      }
    } else {
        throw new Error('ALREADY USED');
    }
  }

  // If anybody find the code, we select a random user who participated.
  // Need to collect the total of attempts for this code
  // criteria attempt.date === currentDate
  // Then randomWinner(totalAttemps.lenght);
  // No version VIP

  async randomWinner() {
    const code = await this.codeRepository.findOne({where: {isFound: false}});
    if (!code) {
      throw new Error('CODE ALREADY FOUND');
    }

    const totalAttempts = await this.repository.find({relations: ['user'], where : {codeDate : code.date}});
    if (!totalAttempts) {
      throw new Error('NO ATTEMPTS');
    }

    const winner = totalAttempts[this.randomInt(totalAttempts.length)].user;
    this.codeIsFound(code, winner);
    return this.codeRepository.save(code);
  }

  randomInt(totalAttempts: number) {
    // start at 0
    return Math.floor(Math.random() * totalAttempts);
  }

  codeIsFound(code: Code, user: User) {
    code.winner = user;
    code.isFound = true;
    return this.codeRepository.save(code);
  }
}
