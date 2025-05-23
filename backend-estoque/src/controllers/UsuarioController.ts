import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import conexao from '../config/database';

class UsuarioController {
    static async cadastrar(req: Request, res: Response) {
        const { nome, email, senha } = req.body;
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        conexao.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaCriptografada],
            (erro) => {
                if (erro) {
                    return res.status(500).json({ erro });
                }
                res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
            }
        );
    }

    static async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        conexao.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email],
            async (erro, resultados: any) => {
                if (erro) return res.status(500).json({ erro });

                if (resultados.length === 0) {
                    return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
                }

                const usuario = resultados[0];

                const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
                if (!senhaCorreta) {
                    return res.status(401).json({ mensagem: 'Senha incorreta.' });
                }

                const token = jwt.sign(
                    { id: usuario.id, nome: usuario.nome, email: usuario.email },
                    process.env.JWT_SECRET as string,
                    { expiresIn: '1d' }
                );

                res.json({ token });
            }
        );
    }
}

export default UsuarioController;
