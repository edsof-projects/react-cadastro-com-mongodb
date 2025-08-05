import { useRef, useEffect } from 'react';
import { useCadastraUser } from '../../hooks/useCadastraUser';
import { useEnterToNextInput } from '../../hooks/useEnterToNextInput';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/formatters';
import styles from './Cadastrauser.module.css';

export default function Cadastrauser() 
{
  const { cadastrar } = useCadastraUser();
  const formRef       = useEnterToNextInput('formId');

  const inputName     = useRef();
  const inputAge      = useRef();
  const inputEmail    = useRef();
  const inputSenha    = useRef();

  useEffect(() => {
    inputName.current.focus(); // Foca automaticamente ao montar
  }, []);

  const handleCadastrar = async () => {
    const dados = {
      name : capitalizeFirstLetter(inputName.current.value),
      age  : parseInt(inputAge.current.value),
      email: inputEmail.current.value,
      senha: inputSenha.current.value
    };

    await cadastrar(dados, () => {
      // Limpa os campos após o cadastro
      inputName.current.value  = '';
      inputAge.current.value   = '';
      inputEmail.current.value = '';
      inputSenha.current.value = '';
    });
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <form onSubmit={(e) => e.preventDefault()} id="formId" ref={formRef}>
          <h1>Cadastro de Usuários</h1>
          <input  ref={inputName}  placeholder="Nome"  type="text"     />
          <input  ref={inputAge}   placeholder="Idade" type="number"   />
          <input  ref={inputEmail} placeholder="Email" type="email"    />
          <input  ref={inputSenha} placeholder="Senha" type="password" />
          <button type="button" onClick={handleCadastrar}>Cadastrar</button>
          <div>
            <p>Já tem cadastro? </p>  
            <p><Link to='/' className={styles.btnLogin}>Faça o Login</Link></p> 
          </div>
        </form>
      </div>
    </div>
  );
}
