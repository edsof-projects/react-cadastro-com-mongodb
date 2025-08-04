import styles                           from './Home.module.css';
import Trash                            from '../../assets/trash.png';
import Foto                             from '../../assets/foto.png';
import Lupa                             from '../../assets/lupa.png';
import Limpar                           from '../../assets/limpar.png';
import Edit                             from '../../assets/editar.png';
import { useEffect, useState, useRef }  from 'react';
import { useAuth }                      from '../../context/AuthContext';
import { listarUsuarios }               from '../../services/userService';
import { useNavigate }                  from 'react-router-dom';
import { useDeletaUser }                from '../../hooks/useDeletaUser';
import { ordenarPorNome }               from '../../utils/ordenar';
import { useFiltroUsuarios }            from '../../hooks/useFiltroUsuarios';
import { pegarPrimeiroNome }            from '../../utils/formatters';

function Home() {
  const [users, setUsers] = useState([]);
  const { deletar }       = useDeletaUser();
  const navigate          = useNavigate();
  const inputPesquisaRef  = useRef(null);
  const { user }          = useAuth();
  const { termo, setTermo, usuariosFiltrados } = useFiltroUsuarios(users);
  
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
      <div className={styles.areaUserLogado}>
        <img src={Foto} alt="Foto do usuário" className={styles.fotoUser}/>
        {user && <p className={styles.nomeUsuario}>Bem-vindo {pegarPrimeiroNome(user.nome)}</p>}

      </div>
      <div className={styles.container}>
        <h1>Listagem de Usuários</h1>

        <div className={styles.areaPesquisa}>
          {/* se nao tiver nada digitado mostrar lupa caso contrario mostrar o X vermelho e apagar */}
          {termo ? 
          (
            <img 
                className={styles.imgapagar}
                src={Limpar} 
                alt="Limpar pesquisa" 
                onClick={() => {
                  setTermo('')
                  inputPesquisaRef.current?.focus()
                }} 
              />
            ) : (
              <img                 
                src={Lupa} 
                alt="Lupa de pesquisa" 
                onClick={() => {
                  setTermo('')
                  inputPesquisaRef.current?.focus()
                }} />
          )}

          <input
            type="text"
            name="pesquisa"
            id="pesquisa"
            value={termo}
            ref={inputPesquisaRef}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Pesquisar por nome, idade ou email"
          />

        </div>

        <div className={styles.content}>
          {usuariosFiltrados.map((user) => (
            <div key={user.id} className={styles.card}>
              <div>
                <p>Id:    <span>{user.id}</span></p>
                <p>Nome:  <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>Email: <span>{user.email}</span></p>
              </div>
              <div className={styles.areabuttons}>
                <button onClick={() => deletar(user.id, getUsers)} title="Excluir usuário">
                  <img src={Trash} alt="Excluir usuário" />
                </button>
                <button onClick={() => navigate(`/editar/${user.id}`)} title="Editar usuário">
                  <img src={Edit} alt="Editar usuário" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.logaut}>
          <p>
            Total de Usuários Cadastrados: {usuariosFiltrados.length}
            {termo && ` (de um total de ${users.length})`}
          </p>
          <p onClick={sair} className={styles.btnLogaut}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
