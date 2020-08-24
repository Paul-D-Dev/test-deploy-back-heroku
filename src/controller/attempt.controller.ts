import { Attempt } from './../entity/attempt.entity';
import { connected } from './../core/connected-middleware';
import { Application, Request, Response, Router } from 'express';
import { commonController } from '../core/common_functions.controller';
import { AttemptService } from '../services/attempt.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const AttemptController = (app: Application) => {
  const attemptService = new AttemptService();

  let router = Router();

  router = commonController(attemptService, router);

  router.use(connected());

  router.post('/try', async (req: Request, res: Response) => {
    const attempt = req.body;
    try {
      // Send a boolean to inform if the answer is correct or not
      // Need to add when if answer is duplicate !!!!!!!!
      res.send(await attemptService.testCode(attempt));
    } catch (error) {
      throw new Error(error);
    }
  });

  router.get('/winner/random', async (req: Request, res: Response) => {
    try {
      await attemptService.randomWinner();
      res.sendStatus(204);
    } catch (error) {
      throw new Error(error);
    }
  });

  app.use('/attempts', router);

};
