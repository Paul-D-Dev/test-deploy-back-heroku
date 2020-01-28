import { commonController } from './../core/common_functions.controller';
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

  let userRouter = Router();

  userRouter = commonController(userService, userRouter);

  app.use('/users', userRouter);

};
