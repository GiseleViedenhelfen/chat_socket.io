import React, { useState } from "react";
import { CreateUser } from "../api/user";
const Register = () => {
  const [name, setName] = useState('')
  const [ CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = async () => {
    console.log(name, CPF, password);
    await CreateUser(name, CPF, password)
  }
return (
  <div>
    <form>
      <label htmlFor="register-name-input">Nome:</label>
      <input 
        id="register-name-input"
        type="text"
        onChange={({target}) => {setName(target.value)}}/>
      <label htmlFor="register-cpf-input">CPF: </label>
      <input 
        id="register-cpf-input"
        type="text"
        onChange={({target}) => {setCPF(target.value)}}/>
      <label htmlFor="register-password-input">Senha:</label>
      <input
        type="password"
        onChange={({target}) => { setPassword(target.value)}}
      />
      <button
        type="button"
        onClick={handleClick}
      >Enviar</button>
    </form>
  </div>
)
}

export default Register;