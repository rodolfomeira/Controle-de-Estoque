import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/usuarios/cadastrar', { nome, email, senha });
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch {
      alert('Erro no cadastro.');
    }
  }

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem conta? <Link to="/">Entrar</Link></p>
    </div>
  );
}

export default Cadastro;
