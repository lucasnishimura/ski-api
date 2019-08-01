import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

import authMiddleware from './middlewares/auth';
import validateFileds from './middlewares/validateFields';

const routes = new Router();

routes.get('/', SessionController.index);
routes.post('/signUp', validateFileds, UserController.store);
routes.post('/signIn', SessionController.store);
routes.get('/users/:id?', authMiddleware, UserController.index);


export default routes;
