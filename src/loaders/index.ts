import { Application } from 'express';
import expressLoader from './express';
import typeOrmLoader from './typeorm';

export default async (app: Application ) => {
  await expressLoader(app);
  console.log('Express Intialized');

  await typeOrmLoader();
  console.log('Typeorm Intialized');
};
