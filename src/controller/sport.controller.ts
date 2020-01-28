import { Application, Request, Response, Router } from 'express';
import { SportService } from './../services/sport.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const SportController = (app: Application) => {

    const sportService = new SportService();
    const sportsRouter: Router = Router();

    sportsRouter.get('/', async (req: Request, res: Response) => {
        res.send(await sportService.getAll());
    });

    sportsRouter.get('/:id', (req: Request, res: Response) => {
        res.send(sportService.getById(parseInt(req.params.id, 10)));
    });

    sportsRouter.post('/', async (req: Request, res: Response) => {
        await sportService.addSport(req.body);
        res.sendStatus(200);
    });

    sportsRouter.delete('/:id', (req: Request, res: Response) => {
        sportService.delete(parseInt(req.params.id, 10));
        res.send('Delete').status(200);
    });

    app.use('/sport', sportsRouter);
};
