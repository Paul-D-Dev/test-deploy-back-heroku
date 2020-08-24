import { JWT_SECRET } from './../config/config';
import jwt = require('express-jwt');

  // Ce middleware permet de récupérer le TOKEN envoyé dans le header (Authorization - Bearer + TOKEN)
  // Son but est de renvoyé la valeur du token à savoir son payload (id, username, email)
export const connected = () => {

    const secret = JWT_SECRET;
    if (!secret) {
        throw new Error('Pas de secret setup');
    }

    return jwt({ secret , algorithms: ['HS256'] });
};
