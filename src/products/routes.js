import { Router } from 'express';
import actions from './actions';

const { get, list } = actions;
 
const productsRouter = Router();

productsRouter.get('/products', list);
productsRouter.get('/products/:id', get);


export default productsRouter;