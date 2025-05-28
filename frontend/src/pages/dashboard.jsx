import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { logout } from '../services/auth';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #f4f4f5;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
`;

const AddButton = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/tasks', { title, description });
    setTitle('');
    setDescription('');
    loadTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <h1>Minhas Tarefas</h1>
      <AddButton onClick={handleLogout}>Sair</AddButton>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <AddButton type="submit">Adicionar</AddButton>
      </form>
      <TaskList>
        {tasks.map((t) => (
          <TaskItem key={t._id}>
            <div>
              <strong>{t.title}</strong> - {t.description}
            </div>
            <Button onClick={() => handleDelete(t._id)}>Remover</Button>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}
