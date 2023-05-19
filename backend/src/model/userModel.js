const mongoose = require("mongoose");

const userMongooseSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
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

const readUserModel = async() => {
  const User = mongoose.model('users', userMongooseSchema);
  const readUsers = await User.find();
  return readUsers
}
  module.exports = {
    createUserModel,
    readUserModel
  };
