const express = require('express');
const router = express.Router();
const usersController = require("../controllers/users.controller");
module.exports = router;

// api routes ===========================================================

router.post('/api/users/register', usersController.registerNew)
router.post('/api/users/login', usersController.login)