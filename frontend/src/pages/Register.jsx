import React, { useState } from "react";
import { CreateUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import './Register.css'
const Register = () => {
  const [name, setName] = useState('')
  const [ CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log(name, CPF, password);
    const registerApi = await CreateUser(name, CPF, password);
    console.log(registerApi);
    if (registerApi.message) {
      setError(registerApi.message)
    }
    else {
      navigate('/')
    }
  }
return (
  <div className="register__container user__container">
    <form className="register__form form__container">
    <h2>Cadastro: </h2>
      <label htmlFor="register-name-input">Nome:</label>
      <input 
        id="register-name-input"
        type="text"
        className="name-field"
        onChange={({target}) => {setName(target.value)}}/>
      <label htmlFor="register-cpf-input">CPF: </label>
      <input 
        id="register-cpf-input"
        className="password-field"
        type="text"
        onChange={({target}) => {setCPF(target.value)}}/>
      <label htmlFor="register-password-input">Senha:</label>
      <input
        type="password"
        className="CPF-field"
        onChange={({target}) => { setPassword(target.value)}}
      />
      <div className="form-button-container">
      <button
        type="button"
        onClick={() => navigate('/')}
        >
          voltar
        </button>
      <button
        type="button"
        onClick={handleClick}
      >
        Enviar
      </button>
      </div>
    </form>
    {error && <p>{`Houve algum problema no registro: ${error}`}</p>}
  </div>
)
}

export default Register;