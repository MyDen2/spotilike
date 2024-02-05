const mongoose = require('mongoose');

const morceauSchema = new mongoose.Schema({
  //_id: { type: Number, required: true, unique: true },
  _id : { type : mongoose.Schema.Types.ObjectId, auto: true},
  titre: { type: String, required: true, unique: true },
  duree: { type: mongoose.Decimal128, required: true },
  id_artiste: { type: mongoose.Schema.Types.ObjectId, ref: 'Artiste', required: true },
  id_album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
}, { _id: false });

module.exports = mongoose.model('Morceau', morceauSchema)