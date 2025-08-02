import styles from './Home.module.css';
import Trash from '../../assets/trash.png';
import Edit from '../../assets/editar.png';
import { useEffect, useState } from 'react';
import { listarUsuarios } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDeletaUser } from '../../hooks/useDeletaUser';
import { ordenarPorNome } from '../../utils/ordenar';

function Home() 
{
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const { deletar } = useDeletaUser();

  const getUsers = async () => {
    try {
      const dados = await listarUsuarios();
      setUsers(ordenarPorNome(dados));
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
                <p>Id:    <span>{user.id}    </span></p>
                <p>Nome:  <span>{user.name}  </span></p>
                <p>Idade: <span>{user.age}   </span></p>
                <p>Email: <span>{user.email} </span></p>
              </div>
              <div className={styles.areabuttons}>
                <button onClick={() => deletar(user.id, getUsers)}>
                  <img src={Trash} alt="Excluir usuário" />
                </button>
                <button onClick={() => navigate(`/editar/${user.id}`)}>
                  <img src={Edit} alt="Editar usuário" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.logaut}>
          <p onClick={sair} className={styles.btnLogaut}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
