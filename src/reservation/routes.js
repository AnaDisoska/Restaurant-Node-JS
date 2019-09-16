import { Router } from 'express';
import actions from './actions';

const { create, del, list, get } = actions;
 
const reservationRouter = Router();

reservationRouter.post('/reservation', create);
reservationRouter.delete('/reservation/:id', del);
reservationRouter.get('/reservation', list);
reservationRouter.get('/reservation/:id', get);

export default reservationRouter;