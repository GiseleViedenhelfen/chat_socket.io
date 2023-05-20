const { createUser, readUser, findUser } = require("../service/userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretdetoken";

class UserController {
  async create(req, res) {
    const { name, CPF, password } = req.body;
    const getUsers = await findUser(CPF, password);
    console.log(getUsers);
    if (name.length < 3) {
      return res
        .status(400)
        .json({
          message:
            '"name" and "lastName" length must be at least 3 characters long',
        });
    } else if (password.length < 6) {
      return res.status(400).json({
        message: '"password" length must be at least 6 characters long',
      });
    } else if (CPF === undefined || CPF.length < 11) {
      return res.status(400).json({
        message: '"CPF" length must have 11 characters',
      });
    } else if (getUsers !== null) {
      res.status(409).json({ message: "User already registered" });
    }
    const jwtConfig = {
      expiresIn: "7d",
      algorithm: "HS256",
    };
    try {
      const createdUser = await createUser(req.body);
      const token = jwt.sign({ data: createdUser }, JWT_SECRET, jwtConfig);
      return res.status(201).json(token);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async read(_req, res) {
    try {
      const getUsers = await readUser();
      return res.status(200).json(getUsers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getOne(req, res) {
    const { id } = req.body;
    const getuser = await findUser(id);
    if (getuser === null) {
      return res.status(404).json({ message: "User does not exist" });
    }
    try {
      return res.status(200).json(getuser);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
