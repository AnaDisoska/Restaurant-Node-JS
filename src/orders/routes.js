import { Router } from 'express';
import actions from './actions';

const { create, get, list } = actions;
 
const orderRouter = Router();

orderRouter.post('/orders', create);
orderRouter.get('/orders', list);
orderRouter.get('/orders/:id', get);

export default orderRouter;