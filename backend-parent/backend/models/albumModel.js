const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  //_id: { type: Number, required: true, unique: true, index : true },
  //_id: { type: Number, auto: true},
  _id : { type : mongoose.Schema.Types.ObjectId, auto: true},
  image_pochette: { type: String, required: true },
  date_sortie: { type: Date, required: true },
  id_artiste: { type: mongoose.Schema.Types.ObjectId, ref: 'Artiste', required: true },
});

//module.exports = mongoose.model('Album', albumSchema)
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;