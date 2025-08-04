import { useState, useMemo } from 'react';

export function useFiltroUsuarios(usuarios) {
  const [termo, setTermo] = useState('');

  const usuariosFiltrados = useMemo(() => {
    const t = termo.toLowerCase();
    return usuarios.filter(user => {
      const nome = user.name?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const idade = user.age !== undefined && user.age !== null ? String(user.age) : '';

      return (
        nome.includes(t) ||
        email.includes(t) ||
        idade.includes(t)
      );
    });
  }, [termo, usuarios]);

  return { termo, setTermo, usuariosFiltrados };
}
