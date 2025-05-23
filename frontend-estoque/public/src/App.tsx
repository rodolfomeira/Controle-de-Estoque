import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import ProdutoForm from './pages/ProdutoForm';
import Navbar from './components/Navbar';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/produto/:id?" element={token ? <ProdutoForm /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
