const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/api/postusers', userController.createUser);

module.exports = router;
