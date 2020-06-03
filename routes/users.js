const express = require('express');
const { userById, allUsers } = require('../controllers/users')
const router = express.Router()
router.get('/users', allUsers)
router.param('UserId', userById);
module.exports = router;