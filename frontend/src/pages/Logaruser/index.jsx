import styles from './Logaruser.module.css'
import { useLogarUser } from '../../hooks/useLogarUser';
import { Link } from 'react-router-dom'

function Logaruser() {
    
  const { inputEmail, inputSenha, logarUser } = useLogarUser();
   
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <form>
            <h1>Acesso ao Sistema</h1>
            <input placeholder="email" type="email"    ref={inputEmail} />
            <input placeholder="senha" type="password" ref={inputSenha} />
            <button type="button" onClick={logarUser}>Entrar</button>
            <div>
              <p>Ainda não tem cadastro?</p>  
              <p><Link to='/register' className={styles.btnRegister}>Cadastre-se!</Link></p>   
            </div>
          </form>  
        </div>
      </div>
    )
}

export default Logaruser
