import { Request, Response, Router } from 'express';
import { AbstractService } from './abstract.services';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const commonController = (service: AbstractService, commonRouter = Router()) => {

  commonRouter.get('/', async (req: Request, res: Response) => {
    res.send(await service.getAll());
  });

  commonRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await service.getById(id);
      res.send(user);

    } catch (error) {
      if (error.message === 'NOT FOUND') {
        res.status(400).send(`REQUETE NON TROUVE`);
      }
    }
  });

  commonRouter.post('/', async (req: Request, res: Response) => {
    res.send(await service.create(req.body));
  });

  commonRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const formData = req.body;
    await service.update(id, formData);
    res.send(`La demande ${id} a bien été modifiée`);

  });

  commonRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    await service.delete(id);
    res.send(`La demande ${id} a bien été supprimée`);
  });

  return commonRouter;
};
