import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { login } from '../services/auth';

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 3rem;
  background: rgb(0, 0, 0);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #4f46e5;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao logar');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Entrar</Button>
      <p>
        Não tem conta? <Link to="/register">Registrar</Link>
      </p>
    </Form>
  );
}