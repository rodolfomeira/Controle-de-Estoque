import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function autenticacao(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.usuario = decodificado;
        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Token inválido.' });
    }
}
