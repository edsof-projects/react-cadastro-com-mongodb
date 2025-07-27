import { useState, useRef } from 'react'
import api from '../../services/api'

const [users, setUsers] = useState([])

  const inputSenha = useRef()
  const inputEmail = useRef()
 
  const createUser = async () => {
    try {
      const res = await api.post('/users', {
        name: inputName.current.value,
        age: parseInt(inputAge.current.value),
        email: inputEmail.current.value,
      })

      if (res.status === 201) {
        getUsers() // Atualiza a lista primeiro
        alert("Usuário cadastrado com sucesso!")
        limparCampos()
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
      alert("Erro ao criar usuário.")
    }
  }
  
  const limparCampos = () => {
    inputSenha.current.value  = "";
    inputEmail.current.value  = "";
  }
  
  
