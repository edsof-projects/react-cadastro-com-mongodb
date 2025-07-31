import { useParams } from 'react-router-dom';
import { useEditaUser } from '../../hooks/useEditaUser';

export default function Editauser() 
{
  const { id } = useParams();

  const {
    inputName,
    inputAge,
    inputEmail,
    inputSenha,
    salvarAlteracoes
  } = useEditaUser(id);

  return (
    <form>
      <input placeholder="Nome" ref={inputName} />
      <input placeholder="Idade" type="number" ref={inputAge} />
      <input placeholder="Email" type="email" ref={inputEmail} />
      <input placeholder="Senha" type="password" ref={inputSenha} />
      <button type="button" onClick={salvarAlteracoes}>Salvar</button>
    </form>
  );
}
