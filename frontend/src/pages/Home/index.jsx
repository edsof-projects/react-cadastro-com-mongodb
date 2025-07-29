import styles from './Home.module.css';
import Trash from '../../assets/trash.png';
import Edit from '../../assets/editar.png';
import { useEffect, useState, useRef } from 'react';
import apiComToken from '../../services/apiComToken';
import { useNavigate } from 'react-router-dom';

function Home() 
{
  const [users, setUsers] = useState([]);
  const api = apiComToken; // corrigido: não é função
  const navigate = useNavigate();

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const limparCampos = () => {
    inputName.current.value = '';
    inputEmail.current.value = '';
    inputAge.current.value = '';
  };

  const createUser = async () => {
    try {
      const res = await api.post('/users', {
        name: inputName.current.value,
        age: parseInt(inputAge.current.value),
        email: inputEmail.current.value,
      });

      if (res.status === 201) {
        await getUsers();
        alert('Usuário cadastrado com sucesso!');
        limparCampos();
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Verifique os dados e tente novamente.');
    }
  };

  const getUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        location.href = '/';
      } else {
        alert('Erro ao carregar usuários.');
        console.error(error);
      }
    }
  };

  const getUser = async (id) => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  };

  const deleteUser = async (id) => {
    const usuario = await getUser(id);
    const nome = usuario?.name || 'Desconhecido';

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o usuário ${nome}?`);
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/users/${id}`);
      if (res.status === 200) {
        alert('Usuário excluído com sucesso!');
        await getUsers();
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário.');
    }
  };

  const sair = () => {
    localStorage.removeItem('token');
    location.href = '/';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado.');
      location.href = '/';
      return;
    }

    getUsers();
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1>Listagem de Usuários</h1>

        <div className={styles.content}>
          {users.map((user) => (
            <div key={user.id} className={styles.card}>
              <div>
                <p>Id: <span>{user.id}</span></p>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>Email: <span>{user.email}</span></p>
              </div>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt="Excluir usuário" />
              </button>
              <button onClick={() => navigate(`/editar/${user.id}`)}>
                <img src={Edit} alt="Editar usuário" />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.logaut}>
          <p>Logout</p>
          <p onClick={sair} className={styles.btnLogaut}>Sair</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
