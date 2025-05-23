import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController';
import { autenticacao } from '../middleware/autenticacao';
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'src/uploads/' });

router.get('/', autenticacao, ProdutoController.listar);
router.post('/', autenticacao, upload.single('imagem'), ProdutoController.cadastrar);
router.put('/:id', autenticacao, upload.single('imagem'), ProdutoController.atualizar);
router.delete('/:id', autenticacao, ProdutoController.excluir);
router.patch('/:id/estoque', autenticacao, ProdutoController.atualizarEstoque);

export default router;
