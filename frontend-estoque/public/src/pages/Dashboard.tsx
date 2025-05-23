import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  valor: number;
  quantidade: number;
}

function Dashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    listarProdutos();
  }, []);

  async function listarProdutos() {
    const resposta = await api.get('/produtos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setProdutos(resposta.data);
  }

  async function excluirProduto(id: number) {
    if (!window.confirm('Deseja realmente excluir?')) return;
    await api.delete(`/produtos/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    listarProdutos();
  }

  async function atualizarEstoque(id: number, novaQuantidade: number) {
    await api.patch(`/produtos/${id}/estoque`, { quantidade: novaQuantidade }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    listarProdutos();
  }

  return (
    <div>
      <h2>Dashboard de Produtos</h2>
      <Link to="/produto"><button>Novo Produto</button></Link>
      <table border={1}>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.imagem && <img src={`http://localhost:3000/uploads/${p.imagem}`} width="50" />}</td>
              <td>{p.nome}</td>
              <td>{p.descricao}</td>
              <td>R$ {p.valor.toFixed(2)}</td>
              <td>
                {p.quantidade} <br />
                <button onClick={() => atualizarEstoque(p.id, p.quantidade + 1)}>+</button>
                <button onClick={() => atualizarEstoque(p.id, p.quantidade - 1)}>-</button>
              </td>
              <td>
                <Link to={`/produto/${p.id}`}><button>Editar</button></Link>
                <button onClick={() => excluirProduto(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
