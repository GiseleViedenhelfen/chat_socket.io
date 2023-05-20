const mongoose = require("mongoose");

const userMongooseSchema = new mongoose.Schema(
  {
    name: String,
    CPF: String,
    password: String,
  },
  { versionKey: false }
);

const createUserModel = async (body) => {
  const User = mongoose.model('users', userMongooseSchema);
  const newUser = new User({...body});
  await newUser.save();
  return newUser;
}

const deleteUsers = async () => {
  const User = mongoose.model('users', userMongooseSchema);
  await User.deleteMany();
}
const readUserModel = async() => {
  const User = mongoose.model('users', userMongooseSchema);
  const readUsers = await User.find();
  return readUsers
}

const getUser = async(userId) => {
  const User = mongoose.model('users', userMongooseSchema);
  const findUser = User.findOne({ _id: userId});
  return findUser
}
  module.exports = {
    createUserModel,
    readUserModel,
    getUser,
    deleteUsers
  };
