import { Router } from 'express';
import actions from './actions';

const { create, del, list, get } = actions;
 
const userProfileRouter = Router();

userProfileRouter.post('/users_reg/:userId/users_profile', create);
userProfileRouter.delete('/users_profile/:id', del);
userProfileRouter.get('/users_profile', list);
userProfileRouter.get('/users_profile/:id', get);



export default userProfileRouter;