import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes';
import produtoRoutes from './produtoRoutes';

const routes = Router();

routes.use('/usuarios', usuarioRoutes);
routes.use('/produtos', produtoRoutes);

export default routes;
