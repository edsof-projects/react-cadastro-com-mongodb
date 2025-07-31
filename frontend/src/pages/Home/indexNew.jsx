import { useLogarUser } from '../../hooks/useLogarUser';
import styles from './Home.module.css';

export default function Home() {
  const { inputEmail, inputSenha, logarUsuario } = useLogarUser();

  return (
    <form>
      <input ref={inputEmail} placeholder="Email" type="email" />
      <input ref={inputSenha} placeholder="Senha" type="password" />
      <button type="button" onClick={logarUsuario}>Entrar</button>
    </form>
  );
}
