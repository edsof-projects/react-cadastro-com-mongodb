import styles from './Editauser.module.css'; 
import { Link, useParams } from 'react-router-dom';
import { useEditaUser } from '../../hooks/useEditaUser';

function Editauser() 
{
  const { id } = useParams(); // ✅ pega o ID da rota

  const {
    inputName,
    inputAge,
    inputEmail,
    inputSenha,
    salvarAlteracoes
  } = useEditaUser(id); // ✅ agora os dados são carregados

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <form>
          <h1>Editar Usuários</h1>
          <input placeholder="nome" type="text" ref={inputName} />
          <input placeholder="idade" type="number" ref={inputAge} />
          <input placeholder="email" type="email" ref={inputEmail} />
          <input placeholder="senha" type="password" ref={inputSenha} />
          <button type="button" onClick={salvarAlteracoes}>Salvar</button>
          <div>
            <p>Ver lista de usuários</p>
            <p><Link to='/users' className={styles.btnLogin}>Lista de Usuários</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editauser;
