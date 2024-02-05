// models/appartient.js
const mongoose = require('mongoose');

/*const appartientSchema = new mongoose.Schema({
  _id: { 
    id_morceau: { type: mongoose.Schema.Types.ObjectId, ref: 'Morceau', required: true },
    id_genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true }
  }
}, { _id: false });*/

const appartientSchema = new mongoose.Schema({
  _id: { 
    id_morceau: { type: mongoose.Schema.Types.ObjectId, ref: 'Morceau', required: true },
    id_genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true }
  }
});

const Appartient = mongoose.model('Appartient', appartientSchema);

module.exports = Appartient;
