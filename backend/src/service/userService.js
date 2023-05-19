const connectToDatabase = require('../model/connection')
const  { createUserModel, readUserModel } = require('../model/userModel');

const createUser = async (body) => {
  try {
    await connectToDatabase()
    const newUser = await createUserModel(body);
    return newUser;
  }
  catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
const readUser = async() => {
  try {
    await connectToDatabase()
    const newUser = await readUserModel();
    return newUser;
  }
  catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
module.exports = {
      createUser,
      readUser,
    };
