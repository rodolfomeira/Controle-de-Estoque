import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resposta = await api.post('/usuarios/login', { email, senha });
      localStorage.setItem('token', resposta.data.token);
      navigate('/dashboard');
    } catch {
      alert('Email ou senha inválidos.');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
  );
}

export default Login;
