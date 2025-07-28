import styles from './Notfound.module.css'

function Notfound() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
          <div className={styles.content}>
            <h1>Ops! Página não encontrada!</h1>
          </div>         
        </div>
    </div>
  )
}

export default Notfound
