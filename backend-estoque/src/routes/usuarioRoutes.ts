import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

router.post('/cadastrar', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login);

export default router;
