import { useLogarUser }         from '../../hooks/useLogarUser';
import { useEnterToNextInput }  from '../../hooks/useEnterToNextInput';
import { Link }                 from 'react-router-dom'
import { useRef, useEffect }    from 'react';
import styles                   from './Logaruser.module.css'

export default function LogarUser() 
{
  const { email, setEmail, senha, setSenha, erro, handleLogin } = useLogarUser();
  const inputEmail  = useRef();
  const formRef     = useEnterToNextInput('formId');

  useEffect(() => {
    inputEmail.current.focus(); // Foca automaticamente ao montar
  }, []);

  // Monitora o erro para limpar após 3 segundos e focar input email
  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setEmail('');  // limpa email
        setSenha('');  // limpa senha
        // limpa erro e foca input email - você precisa expor setErro no hook para isso,
        // ou faça um workaround se preferir
        // aqui só o foco para email, pois setErro está no hook
        inputEmail.current.focus();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [erro, setEmail, setSenha]);

  return (
    <div className={styles.section}>
        <div className={styles.container}>
          <form onSubmit={handleLogin} id="formId" ref={formRef}>
            
            <h1>Acesso ao Sistema</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              ref={inputEmail}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            {erro && <p style={{ color: 'red', textAlign:'center' }}>{erro}</p>}
            <button type="submit">Entrar</button>

            <div className={styles.infos}>
              <span>Ainda não tem cadastro?</span>  
              <Link to='/register' className={styles.btnRegister}>Cadastre-se!</Link> 
              <Link to='/editarsenha' className={styles.btnRegister}>Esqueci a senha!</Link>
            </div>   

          </form>
        </div>
    </div>
  )
}