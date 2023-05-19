const { Router } = require('express');
const userController = require('../controller/userController');

const route = Router();
const UserController = new userController();

route.post('/users', async (req, res) => UserController.create(req, res));
route.get('/users', async (req, res) => UserController.read(req, res));

module.exports = route;