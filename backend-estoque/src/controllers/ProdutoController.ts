import { Request, Response } from 'express';
import conexao from '../config/database';

class ProdutoController {
    static listar(req: Request, res: Response) {
        conexao.query('SELECT * FROM produtos', (erro, resultados) => {
            if (erro) return res.status(500).json({ erro });
            res.json(resultados);
        });
    }

    static cadastrar(req: Request, res: Response) {
        const { nome, descricao, valor, quantidade } = req.body;
        const imagem = req.file ? req.file.filename : null;

        conexao.query(
            'INSERT INTO produtos (nome, descricao, imagem, valor, quantidade) VALUES (?, ?, ?, ?, ?)',
            [nome, descricao, imagem, valor, quantidade],
            (erro) => {
                if (erro) return res.status(500).json({ erro });
                res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.' });
            }
        );
    }

    static atualizar(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, descricao, valor, quantidade } = req.body;
        const imagem = req.file ? req.file.filename : null;

        conexao.query(
            'UPDATE produtos SET nome=?, descricao=?, imagem=?, valor=?, quantidade=? WHERE id=?',
            [nome, descricao, imagem, valor, quantidade, id],
            (erro) => {
                if (erro) return res.status(500).json({ erro });
                res.json({ mensagem: 'Produto atualizado com sucesso.' });
            }
        );
    }

    static excluir(req: Request, res: Response) {
        const { id } = req.params;
        conexao.query('DELETE FROM produtos WHERE id = ?', [id], (erro) => {
            if (erro) return res.status(500).json({ erro });
            res.json({ mensagem: 'Produto excluído com sucesso.' });
        });
    }

    static atualizarEstoque(req: Request, res: Response) {
        const { id } = req.params;
        const { quantidade } = req.body;

        conexao.query(
            'UPDATE produtos SET quantidade=? WHERE id=?',
            [quantidade, id],
            (erro) => {
                if (erro) return res.status(500).json({ erro });
                res.json({ mensagem: 'Estoque atualizado com sucesso.' });
            }
        );
    }
}

export default ProdutoController;
