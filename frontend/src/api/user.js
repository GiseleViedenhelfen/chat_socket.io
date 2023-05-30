import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function getUsers() {
  const result = await axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return result;
}

export async function login(CPF, password) {
  const response = await axios
    .post(`${baseUrl}/login`, { CPF: CPF, password: password })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
export async function CreateUser(name, CPF, password) {
  const response = await axios
  .post(baseUrl, {name, CPF, password})
  .then((response) => response.data)
  .catch((error) => error.response.data);
}
