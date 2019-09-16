import { Router } from 'express';
import actions from './actions';

const { create, get, list } = actions;
 
const deliveryRouter = Router();

deliveryRouter.post('/delivery', create);
deliveryRouter.get('/delivery', list);
deliveryRouter.get('/delivery/:id', get);



export default deliveryRouter;