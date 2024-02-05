const express = require('express')
const router = express.Router()
const {
    addUser, 
    deleteUser
} = require('../controllers/userController')

const { protect } = require('../middlewares/authMiddleware')

router.post('/users/signup', addUser) // endpoint 6
router.delete('/users/:id', protect, deleteUser) // endpoint 13

module.exports = router