import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { logout } from '../services/auth';

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
    <div>
      <h1>Minhas Tarefas</h1>
      <button onClick={handleLogout}>Sair</button>
      <form onSubmit={handleAdd}>
        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong> - {t.description}
            <button onClick={() => handleDelete(t._id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
