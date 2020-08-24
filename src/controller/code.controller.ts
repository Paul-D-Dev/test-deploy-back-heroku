import { Application, Request, Response, Router } from 'express';
import { commonController } from '../core/common_functions.controller';
import { CodeService } from '../services/code.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const CodeController = (app: Application) => {
  const codeService = new CodeService();

  let codeRouter = Router();

  codeRouter = commonController(codeService, codeRouter);

  codeRouter.get('/', async (req: Request, res: Response) => {
    try {
      await codeService.getAll();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
    }
  });

  codeRouter.post('/', async (req: Request, res: Response) => {
    try {
      await codeService.create();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
    }
  });

  codeRouter.get('/winners', async (req: Request, res: Response) => {
    try {
      await codeService.getWinners();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
    }
  });

  app.use('/codes', codeRouter);

};
