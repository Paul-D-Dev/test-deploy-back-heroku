import express from 'express';
import 'reflect-metadata';
import { AttemptController } from './controller/attempt.controller';
import { AuthController } from './controller/auth.controller';
import { CodeController } from './controller/code.controller';
import { UserController } from './controller/user.controller';
import loaders from './loaders';

async function startServer() {
    // Récupération de l'application initiale
    const app = express();
    const port = 3001;

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    UserController(app);
    AuthController(app);
    CodeController(app);
    AttemptController(app);

    // Démarrage du serveur une fois que tout est correctement init
    app.listen(port, () => console.log(`Express server  is running ${port}`));
  }

startServer();
