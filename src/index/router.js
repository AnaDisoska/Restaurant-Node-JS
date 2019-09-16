import { Router } from 'express';
import users_reg from '../users_reg/index';
import users_profile from '../users_profile/index';
import reservation from '../reservation/index';
import orders from '../orders/index';
import products from '../products/index';
import delivery from '../delivery/index';


const { routes } = users_reg;

const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(users_reg.routes);
indexRouter.use(reservation.routes);
indexRouter.use(orders.routes);
indexRouter.use(products.routes);
indexRouter.use(delivery.routes);


export default indexRouter;