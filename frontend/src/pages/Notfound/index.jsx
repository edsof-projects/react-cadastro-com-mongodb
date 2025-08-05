import styles from './Notfound.module.css'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Notfound() {
  const navigate = useNavigate();

   useEffect(() => {
    // Remove o token do localStorage -> pode usar tambem : localStorage.clear()
    localStorage.removeItem('token');

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // 3 segundos

    // Limpa o timer caso o componente seja desmontado antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
          <div className={styles.content}>
            <h1>[ 404 - Ops! Página não encontrada! ]</h1>
            <p>Você será redirecionado para a página de login em alguns segundos...</p>
          </div>         
        </div>
    </div>
  )
}

export default Notfound
