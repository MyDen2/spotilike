const asyncHandler = require('express-async-handler')
const ArtistModel = require('../models/artisteModel')
const MorceauModel = require('../models/morceauModel')
const deleteAlbum = require('./albumController')

// 5. GET - /api/artists/:id/songs : Récupère la liste de tous les morceaux de l’artiste précisé par :id
const getArtistSongs = asyncHandler(async (req, res) => {
    // Vérifier d'abord si l'artiste existe
    console.log("on passe ici !");
    const artiste = await ArtistModel.findById(req.params.id);

    if (!artiste) {
        return res.status(404).json({ message: "Artiste not found" });
    }

    const songs = await MorceauModel.find({ id_artiste: req.params.id });

    res.status(200).json(songs);
});

// 10. PUT - /api/artists/:id : Modification de l’artiste précisé par :id
const updateArtiste = asyncHandler(async (req, res) => {
    const artist = await ArtistModel.findById(req.params.id)
    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }
    const updatedArtist = await ArtistModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Retourner le document mis à jour
        runValidators: true, // Appliquer les validateurs définis dans le schéma
    });
    
    res.status(200).json(updatedArtist)
})

// 15. DELETE - /api/artists/:id : Supression de l’artiste précisé par :id
const deleteArtist = asyncHandler(async (req, res) => {
    console.log("hdioejpoze")
    const artist = await ArtistModel.findById(req.params.id)
    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }

    // delete album et les morceaux associés :
    deleteAlbum(req.params.id)

    const deletedArtist = await ArtistModel.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedArtist)
    
})

module.exports = {
    getArtistSongs,
    updateArtiste,
    deleteArtist
}