import styles from './Editasenha.module.css'; 
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useEditaSenha } from '../../hooks/useEditaSenha';

function Editasenha() 
{

  const inputEmail = useRef();
  const inputSenha = useRef();

  const getId = (inputEmail) =>{
     
    return id
  }

  // const {
  //   inputEmail,
  //   inputSenha,
  //   salvarAlteracoes
  // } = useEditaSenha(id); // ✅ agora os dados são carregados

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <form>
          <h1>Alteração de Senha</h1>
          <input placeholder="Digite seu email" type="email" ref={inputEmail} />
          <input placeholder="Digite a senha" type="password" ref={inputSenha} />
          <input placeholder="Digite novamente a senha" type="password" ref={inputSenha} />
          <button type="button" >Salvar</button>
          {/* <div>
            <p>Sair do Sistema</p>
            <p><Link to='/' className={styles.btnLogin}>Sair</Link></p>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Editasenha;
