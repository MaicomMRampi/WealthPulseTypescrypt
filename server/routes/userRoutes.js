const express = require('express');
const router = express.Router();
const userController = require('../controlers/userControlers');

console.log("chegou no routes")


router.post('/api/postusers', userController.createUser);

module.exports = router