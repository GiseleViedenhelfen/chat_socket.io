import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../api/user";

const Login = () => {

  const [logged, setLogged] = useState(false);
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleClick = async () => {
    const logApi = await login(CPF, password);
    console.log(CPF.length);
    if (logApi.token) {
      console.log('logado');
      setLogged(true)
      setUserNotFound(false)
      navigate('/home')
    }
    if (logApi.message) {
      // window.alert(logApi.message)
      setUserNotFound(true)
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="CPF-field">CPF:</label>
        <input
          type="text"
          id="CPF-field"
          onChange={({ target }) => setCPF(target.value)}
        />
        <label htmlFor="password-field">password:</label>
        <input
          type="text"
          id="password-field"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="button" onClick={handleClick}>
          login
        </button>
      </form>
      {userNotFound
      && <div>
        <h3>usuário não encontrado, pro favor verifique cpf e senha e tente novamente</h3>
        {/* <h3>caso não tenha login, registre-se</h3> */}
        </div>}
    </div>
  );
};
export default Login;
