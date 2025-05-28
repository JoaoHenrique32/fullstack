import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { logout } from '../services/auth';

const Container = styled.div`
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

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: rgb(58, 58, 61);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  margin-top: 4px;
`;

const AddButton = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin: 4px;
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadTasks = async () => {
    const res = await api.get('/task');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/task', { title, description });
    setTitle('');
    setDescription('');
    loadTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/task/${id}`);
    loadTasks();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await api.put(`/task/${id}`, { status: newStatus });
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
            <div>
              <select
                value={t.status}
                onChange={(e) => handleUpdateStatus(t._id, e.target.value)}
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
              </select>
            </div>
            <Button onClick={() => handleDelete(t._id)}>Remover</Button>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}
