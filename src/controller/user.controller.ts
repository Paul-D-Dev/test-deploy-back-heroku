import { Application, Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UserController = (app: Application) => {
  const userService = new UserService();

  const userRouter = Router();

  userRouter.get('/', async (req: Request, res: Response) => {
    res.send(await userService.getAll());
  });

  userRouter.post('/', async (req: Request, res: Response) => {
    res.send(await userService.post(req.body));
  });

  app.use('/user', userRouter);

};
