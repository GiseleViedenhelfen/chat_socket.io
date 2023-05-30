const { createUser, readUser, findUser, resetDB } = require("../service/userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

class UserController {
  
  async create(req, res) {
    const { name, CPF, password } = req.body;

    const jwtConfig = {
      expiresIn: "7d",
      algorithm: "HS256",
    }
    
    const getUsers = await readUser();
    const arrCPFs = getUsers.filter((user) => user.CPF === CPF);

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
    }
    else if (arrCPFs.length > 0) {
      res.status(409).json({ message: "User already registered" });
    }    
    else {
      const createdUser = await createUser(req.body);
      return res.status(201).json(createdUser);
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
  async login(req, res) {
    try {
      const { CPF, password } = req.body;
      const getuser = await findUser(CPF);
    if (!getuser || getuser.password !== password) {
      return res.status(404).json({ message: "User does not exist or is using an incorrect password" });
    }
    const jwtConfig = {
      expiresIn: "7d",
      algorithm: "HS256",
    }
      const token = jwt.sign({ CPF: getuser.CPF }, JWT_SECRET, jwtConfig);
      res.setHeader('Authorization', token);
      return  res.status(200).json({ token: token, username: getuser.name });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getLogin(req,res) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token could not found' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await findUser(decoded.CPF);
      if (!user) {
        return res.status(401).json({ message: 'user not found!' });
      }
      req.user = user;
    } catch (err) {
      console.log("erro => ", err);
      return res.status(401).json({ message: err.message });
    }
  }
  async resetDatabase(req, res) {
    try {
      await resetDB()
      return res.status(200).send('database was reseted');
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}


module.exports = UserController;
