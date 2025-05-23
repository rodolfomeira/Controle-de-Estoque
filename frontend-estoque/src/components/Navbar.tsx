import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
      <Link to="/dashboard" style={{ marginRight: '20px' }}>Dashboard</Link>
      <Link to="/produto" style={{ marginRight: '20px' }}>Novo Produto</Link>
      <button onClick={logout}>Sair</button>
    </nav>
  );
}

export default Navbar;
