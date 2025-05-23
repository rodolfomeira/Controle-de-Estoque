import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar no banco de dados:', erro);
        return;
    }
    console.log('Banco de dados conectado com sucesso!');
});

export default conexao;
