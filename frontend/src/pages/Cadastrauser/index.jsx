import styles from './Cadastrauser.module.css'; 
import { Link } from 'react-router-dom'
import { useCadastraUser } from '../../hooks/useCadastraUser';

function Cadastrauser() 
{    
  const { inputName, inputAge, inputEmail, inputSenha, createUser } = useCadastraUser();
 
  return (
     <div className={styles.section}>
        <div className={styles.container}>
          <form>
            <h1>Cadastro de Usuários</h1>
            <input placeholder="nome"  type="text"     ref={inputName}  />
            <input placeholder="idade" type="number"   ref={inputAge}   />
            <input placeholder="email" type="email"    ref={inputEmail} />
            <input placeholder="senha" type="password" ref={inputSenha} />
            <button type="button" onClick={createUser}>Cadastrar</button>
            <div>
              <p>Já fez o seu cadastro? </p>  
              <p><Link to='/' className={styles.btnLogin}>Faça o Login</Link></p> 
            </div>
          </form>     
        </div>
     </div>
  );
}

export default Cadastrauser;
