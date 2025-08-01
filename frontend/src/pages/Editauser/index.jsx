import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getUserById, atualizarUsuario } from '../../services/userService';
import { capitalizeFirstLetter } from '../../utils/formatters';
import styles from './Editauser.module.css';

export default function Editauser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', age: '', email: '' });
  const inputName = useRef();

  // Carrega os dados do usuário e, após preencher o estado, foca e seleciona o input uma única vez
  useEffect(() => {
    async function fetchUser() {
      try {
        const usuario = await getUserById(id);
        setForm({
          name: capitalizeFirstLetter(usuario.name),
          age: usuario.age,
          email: usuario.email
        });

        // Delay para garantir que o valor já está no input antes de selecionar
        setTimeout(() => {
          if (inputName.current) {
            inputName.current.focus();
            inputName.current.select();
          }
        }, 100);
      } catch (err) {
        alert('Erro ao carregar usuário');
        console.error(err);
      }
    }

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarUsuario(id, form);
      alert('Usuário atualizado com sucesso!');
      navigate('/home');
    } catch (err) {
      alert('Erro ao atualizar usuário');
      console.error(err);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Editar Usuário</h1>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            ref={inputName}
            onFocus={e => e.target.select()}  // seleciona todo texto ao focar/clicar
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Idade"
            type="number"
            onFocus={e => e.target.select()}  // seleciona todo texto ao focar/clicar
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            onFocus={e => e.target.select()}  // seleciona todo texto ao focar/clicar
          />
          <button type="submit">Salvar</button>
          <div>
            <p>Voltar</p>
            <p>
              <Link to="/home" className={styles.btnLogin}>
                Listagem
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
