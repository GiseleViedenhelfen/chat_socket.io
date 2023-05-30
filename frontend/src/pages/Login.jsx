import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user";
import ChatContext from "../context/chatContext";

const Login = () => {
  const [CPF, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(ChatContext)
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const logApi = await login(CPF, password);
    if (logApi.message) {
      setUserNotFound(true);
    } else {
      setUserNotFound(false);
     localStorage.setItem("userName", JSON.stringify(logApi))
     setCurrentUser(logApi)
      navigate("/home");
    }
  };

  return (
    <div className="login__container user__container">
      <form  className="login__form form__container">
      <h2>Login: </h2>
        <label htmlFor="CPF-field">CPF:</label>
        <input
          type="text"
          className="CPF-field"
          id="CPF-field"
          onChange={({ target }) => setCPF(target.value)}
        />
        <label htmlFor="password-field">password:</label>
        <input
          type="password"
          className="password-field"
          id="password-field"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="form-button-container">
        <button type="button" onClick={handleClick}>
          login
        </button>
        <button
          type="button"
          onClick={() => navigate('/Register')}
          >
            cadastro
          </button>
        </div>
      </form>
      {userNotFound && (
        <div>
          <h3>
            usuário não encontrado, pro favor verifique cpf e senha e tente
            novamente
          </h3>
        </div>
      )}
    </div>
  );
};
export default Login;
