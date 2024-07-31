const express = require('express');
const { getUsers, createrUser, updateUser, deleteUser, createUser} = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id', deleteUser);

module.exports = router;
