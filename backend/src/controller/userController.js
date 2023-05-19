const { createUser, readUser } = require('../service/userService')

class UserController {
  async create(req, res) {
    try {
      const createdUser = await createUser(req.body);
      return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async read(req, res) {
    try {
      const getUsers = await readUser();
      return res.status(200).json(getUsers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
