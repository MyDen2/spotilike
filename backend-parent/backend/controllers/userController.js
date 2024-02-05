const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const asyncHandler = require('express-async-handler')
const UserModel = require('../models/utilisateurModel')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
    })
}
   

// 6. POST - /api/users/signup : Ajout d’un utilisateur
const addUser = asyncHandler(async (req, res) => {

    const { username, email, mdp } = req.body

    console.log("1gvhbknlkl")

        if (!username || !mdp || !email) {
            res.status(400)
            throw new Error('Please add all fields')
        }

    // Check if user already exists
    const userExists = await UserModel.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(mdp, salt)

    // Create the password
    const user = await UserModel.create({
        username,
        mdp : hashedPassword,
        email,
    });

    // Handling the response
    if (user) {
        res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id)
    })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// 13. DELETE - /api/users/:id : Suppression de utilisateur précisé par :id
const deleteUser = asyncHandler(async (req, res) => {
    console.log("hdioejpoze")
    const user = await UserModel.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedUser)
})

module.exports = {
    addUser, 
    deleteUser
}