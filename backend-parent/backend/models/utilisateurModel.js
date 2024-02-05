const mongoose = require('mongoose')

const utilisateurSchema = mongoose.Schema(
{
    //_id: { type: Number, required: true, unique: true },
    _id : { type : mongoose.Schema.Types.ObjectId, auto: true},
    username: { type: String, required: [true, 'Please add an username']},
    email: { type: String, required: [true, 'Please add an email'] },
    mdp: { type: String, required: [true, 'Please add a password'] }
    
}, { _id: false, timestamps: true })

module.exports = mongoose.model('Utilisateur', utilisateurSchema)
