import styles from './Home.module.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  const createUser = async () => {
    try {
      const res = await api.post('/users', {
        name: inputName.current.value,
        age: parseInt(inputAge.current.value),
        email: inputEmail.current.value,
      });

      if (res.status === 201) {
        getUsers() // Atualiza a lista primeiro
        alert("Usuário cadastrado com sucesso!");
        limparCampos()
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário.");
    }
  };

  const getUsers = async () => {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  const getUser = async (id) => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data; // ← garantir que retorne o usuário
      alert(res.data)
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  };

  const deleteUser = async (id) => {
    const usuario = await getUser(id); // ← aqui usamos await
    const nome = usuario.name || 'Desconhecido';

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o usuário ${nome}?`);

    if (!confirmDelete) return; // Se cancelar, sai da função

    try {
      const res = await api.delete(`/users/${id}`);

      if (res.status === 200) {
        alert("Usuário excluído com sucesso!");
        getUsers(); // Atualiza a lista
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário.");
    }
  }

  const limparCampos = () => {
    inputName.current.value = "";
    inputEmail.current.value = "";
    inputAge.current.value = "";
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className={styles.section}>
      <div className={styles.container}> 
        <h1>Listagem de Usuários</h1>
        <div className={styles.content}>        
          {users.map((user) => (

            <div key={user.id} className={styles.card}>
              <div>
                <p>Id    :  <span> {user.id}    </span> </p>
                <p>Nome  :  <span> {user.name}  </span> </p>
                <p>Idade :  <span> {user.age}   </span> </p>
                <p>Email :  <span> {user.email} </span> </p>
              </div>
              <button>
                <img src={Trash} alt="lixeira" onClick={() => deleteUser(user.id)} />
              </button>
            </div>
          ))}
        </div>      
      </div>

    </div>
  )
}

export default Home
