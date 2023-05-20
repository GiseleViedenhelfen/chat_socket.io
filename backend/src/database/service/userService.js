const connectToDatabase = require("../model/connection");
const {
  createUserModel,
  readUserModel,
  getUser,
  deleteUsers
} = require("../model/userModel");

const createUser = async (body) => {
  try {
    await connectToDatabase();
    const newUser = await createUserModel(body);
    return newUser;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
const readUser = async () => {
  try {
    await connectToDatabase();
    const newUser = await readUserModel();
    return newUser;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
const findUser = async (id) => {
  try {
    await connectToDatabase();
    const checkUsers = await readUser();
    const arrIds = checkUsers.filter((user) => user.id === id);
    return arrIds.length > 0 && (await getUser(id));
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
const resetDB = async() => {
  try {
    await connectToDatabase();
    await deleteUsers();
  } catch (error) {
    console.error('sorry, was not posible to reset database: ', error)
  }
};
module.exports = {
  createUser,
  readUser,
  findUser,
  resetDB
};
