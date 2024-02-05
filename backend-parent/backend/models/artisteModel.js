const mongoose = require('mongoose')

const artisteSchema = mongoose.Schema(
{
    //_id: { type: Number, required: true, unique: true },
    _id : { type : mongoose.Schema.Types.ObjectId, auto: true},
    nom: { type: String, required: true },
    biographie: { type: String, required: true },
}, { _id: false })

module.exports = mongoose.model('Artiste', artisteSchema)
