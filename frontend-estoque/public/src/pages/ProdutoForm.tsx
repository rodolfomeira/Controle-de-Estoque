import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function ProdutoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/produtos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then((res) => {
        const produto = res.data.find((p: any) => p.id == id);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setValor(produto.valor);
        setQuantidade(produto.quantidade);
      });
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('valor', valor.toString());
    formData.append('quantidade', quantidade.toString());
    if (imagem) formData.append('imagem', imagem);

    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

    if (id) {
      await api.put(`/produtos/${id}`, formData, { headers });
    } else {
      await api.post('/produtos', formData, { headers });
    }
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>{id ? 'Editar Produto' : 'Novo Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(Number(e.target.value))} required />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} required />
        <input type="file" onChange={(e) => setImagem(e.target.files?.[0] || null)} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ProdutoForm;
