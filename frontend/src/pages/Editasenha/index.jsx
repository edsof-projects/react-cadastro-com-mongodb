import styles from './Editasenha.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { alterarSenhaPorEmail } from '../../services/userService';

function Editasenha() 
{
  const inputEmail  = useRef();
  const inputSenha1 = useRef();
  const inputSenha2 = useRef();
  const navigate    = useNavigate();

   useEffect(() => {
      inputEmail.current.focus(); // Foca automaticamente ao montar
    }, []);

  const handleSalvar = async () => 
  {
    const email  = inputEmail.current.value.trim();  
    const senha1 = inputSenha1.current.value.trim();
    const senha2 = inputSenha2.current.value.trim();

    if (!email || !senha1 || !senha2) {
      alert("Preencha todos os campos.");
      return;
    }

    //Controla a qde de caracteres na senha
    // if (senha1.length < 6) {
    //   alert("A senha deve ter no mínimo 6 caracteres.");
    //   return;
    // }

    if (senha1 !== senha2) {
      alert("As senhas digitadas não coincidem.");
      return;
    }

    try {      
      await alterarSenhaPorEmail(email, senha1);
      alert("Senha alterada com sucesso!");
      navigate('/')
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        alert("E-mail não encontrado.");
      } else {
        console.error("Erro ao alterar senha:", error);
        alert("Erro ao alterar senha. Tente novamente.");
      }     
    }
}

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <form>
          <h1>Alteração de Senha</h1>
          <input placeholder="Digite seu email" type="email" ref={inputEmail} />
          <input placeholder="Digite a nova senha" type="password" ref={inputSenha1} />
          <input placeholder="Repita a nova senha" type="password" ref={inputSenha2} />
          <button type="button" onClick={handleSalvar}>Salvar</button>
          <div>
            <p>Logar no Sistema</p>
            <p><Link to='/' className={styles.btnLogin}>Sair</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editasenha;
