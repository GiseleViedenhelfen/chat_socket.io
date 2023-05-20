const { Router } = require('express');
const userController = require('../database/controller/userController');


const route = Router();
const UserController = new userController();

route.post('/', async (req, res) => (UserController.create(req, res)));
route.get('/', async (req, res) => UserController.read(req, res));

route.get('/login', async(req, res) => (UserController.getOne(req, res)));

route.delete('/', async (req, res) => UserController.resetDatabase(req, res))

module.exports = route;