import { Router } from 'express';
import actions from './actions';

const { create, del, list, get } = actions;
 
const userRouter = Router();

userRouter.post('/sign-up', create);
userRouter.delete('/users_reg/:id', del);
userRouter.get('/users_reg', list);
userRouter.get('/users_reg/:id', get);

export default userRouter;