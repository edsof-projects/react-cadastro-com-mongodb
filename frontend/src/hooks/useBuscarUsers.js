import { useEffect, useState } from 'react';
import apiComToken from '../services/apiComToken';

export function useBuscarUsers() 
{
  const [users, setUsers] = useState([]);
  const [erro, setErro]   = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await apiComToken.get('/users'); // ✅ Rota protegida
        setUsers(res.data);
      } catch (err) {
        setErro('Erro ao buscar usuários. Token inválido ou expirado.');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    buscar();
  }, []);

  return { users, erro, carregando };
}
