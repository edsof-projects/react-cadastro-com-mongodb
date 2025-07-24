import styles from './Home.module.css'
import Trash from '../../assets/trash.png'

function Home() {

  const users = [
    {
      id: '156d51816',
      name: 'Linao',
      age: "58",
      email: "linao@mail.com"
    },
    {
      id: '156ds516',
      name: 'Nane',
      age: "50",
      email: "nane@mail.com"
    },
    {
      id: '1515w816',
      name: 'Gui',
      age: "16",
      email: "gui@mail.com"
    },
    {
      id: '6w151616',
      name: 'Kaua',
      age: "19",
      email: "kaua@mail.com"
    }
  ]

  return (
    <div className={styles.container}>
      
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='nome' type="text" name='nome' />
        <input placeholder='idade' type="number" name='idade' />
        <input placeholder='email' type="email" name='email' />
        <button type="button">Cadastrar</button>
      </form>

      {users.map((user) => (

        <div key={user.id} className={styles.card}>
          <div>
            <p>Id    :  <span> {user.id}    </span> </p>
            <p>Nome  :  <span> {user.name}  </span> </p>
            <p>Idade :  <span> {user.age}   </span> </p>
            <p>Email :  <span> {user.email} </span> </p>
          </div>
          <button>
            <img src={Trash} alt="lixeira"/>
          </button>
        </div>

      ))}

    </div>
  )
}

export default Home
