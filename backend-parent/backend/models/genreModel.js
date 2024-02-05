const mongoose = require('mongoose')

const genreSchema = mongoose.Schema(
{
    //_id: { type:  Number},
    _id : { type : mongoose.Schema.Types.ObjectId, auto: true},
    titre: { type: String, required: true },
    description: { type: String, required: true },
} )

module.exports = mongoose.model('Genre', genreSchema)
