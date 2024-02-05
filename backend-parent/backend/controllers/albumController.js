const asyncHandler = require('express-async-handler')
const AlbumModel = require('../models/albumModel')
const MorceauModel = require('../models/morceauModel')
const AppartientModel = require('../models/appartientModel')


// 1 GET - /api/albums : Récupère la liste de tous les albums
const getAlbums = asyncHandler(async (req, res) => {
    const albums = await AlbumModel.find()
    if (!albums) {
        // L'album n'a pas été trouvé, renvoyer un message d'erreur
        return res.status(404).json({ message: "Il n'existe aucun album !" });
    }
    res.status(200).json(albums)
})

// 2. GET - /api/albums/:id : Récupère les détails de l’album précisé par :id
const getAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)

    if (!album) {
        // L'album n'a pas été trouvé, renvoyer un message d'erreur
        return res.status(404).json({ message: "Album non trouvé" });
    }
    res.status(200).json(album)
})

// 3. GET - /api/albums/:id/songs : Récupère les morceaux de l’album précisé par :id
const getAlbumSongs = asyncHandler(async (req, res) => {
    // Vérifier d'abord si l'album existe
    const album = await AlbumModel.findById(req.params.id);

    if (!album) {
        return res.status(404).json({ message: "Album not found" });
    }

    const songs = await MorceauModel.find({ id_album: req.params.id });

    res.status(200).json(songs);
});

// 8. POST - /api/albums : Ajout d’un album
const addAlbum = asyncHandler(async (req, res) => {
    try {
        const { image_pochette, date_sortie, id_artiste } = req.body;

        if (!image_pochette || !date_sortie || !id_artiste) {
            res.status(400).json({ success: false, message: 'Please provide image_pochette, date_sortie, and id_artiste for the album.' });
            return;
        }
        console.log("Image : ", image_pochette);
        console.log("Date : ", date_sortie);
        console.log("Id : ", id_artiste);
        const album = await AlbumModel.create({
            image_pochette,
            date_sortie,
            id_artiste,
        });

        res.status(201).json({ success: true, data: album });
    } catch (error) {
        console.error(error); // Afficher l'erreur dans la console
        res.status(500).json({ success: false, message: 'Error adding album to the database.' });
    }
})

// 9. POST - /api/albums/:id/songs : Ajout d’un album
const addAlbumSong = asyncHandler(async (req, res) => {
     // Vérifier d'abord si l'album existe
     console.log("on passe ici !");
     const album = await AlbumModel.findById(req.params.id);
 
     if (!album) {
         return res.status(404).json({ message: "Album not found" });
     }
    try {

     const { titre, duree, id_artiste, id_album } = req.body;

        if (!titre || !duree || !id_artiste || !id_album) {
            res.status(400).json({ success: false, message: 'Please provide titre, duree, id_artiste and id_album for the song.' });
            return;
        }
        console.log("Titre : ", titre);
        console.log("Duree : ", duree);
        console.log("Id_artiste : ", id_artiste);
        console.log("Id_album : ", id_album);        
        const song = await MorceauModel.create({
            titre,
            duree,
            id_artiste,
            id_album,
        });

        res.status(201).json({ success: true, data: song });
    } catch (error) {
        console.error(error); // Afficher l'erreur dans la console
        res.status(500).json({ success: false, message: 'Error adding song to the album.' });
    }
})

// 11. PUT - /api/albums/:id : Modification de l’album précisé par :id
const updateAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)
    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }
    const updatedAlbum = await AlbumModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Retourner le document mis à jour
        runValidators: true, // Appliquer les validateurs définis dans le schéma
    });
    
    res.status(200).json(updatedAlbum)
})

// 14. DELETE - /api/albums/:id : Suppression de l’album précisé par :id
const deleteAlbum = asyncHandler(async (req, res) => {
    console.log("hdioejpoze")
    const album = await AlbumModel.findById(req.params.id)
    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }
   /* 
    const deletedAlbum = await AlbumModel.findByIdAndDelete(req.params.id)

    //supprimer les morceaux 
    const deletedSongs = await MorceauModel.deleteMany({ id_album: req.params.id });
    
    // morceaux associés à l'album  

    // Supprimer les enregistrements de Appartient associés aux morceaux
    const deletedAppartients = await AppartientModel.deleteMany({ id_morceau: { $in: deletedSongs.map(song => song._id) } });

    res.status(200).json(deletedAlbum, deletedSongs, deletedAppartients)
    */
    // console.log("Deleting album:", albumId);

    // Récupérer les morceaux associés à l'album
    const songs = await MorceauModel.find({ id_album: req.params.id });

    // Récupérer les enregistrements de la table Appartient associés aux morceaux
    const appartientsToDelete = await AppartientModel.find({ '_id.id_morceau': { $in: songs.map(song => song._id) } });

    // Supprimer les enregistrements de la table Appartient
    const deletedAppartients = await AppartientModel.deleteMany({ '_id.id_morceau': { $in: appartientsToDelete.map(appartient => appartient._id.id_morceau) } });

    // Supprimer les morceaux associés à l'album
    const deletedSongs = await MorceauModel.deleteMany({ id_album: req.params.id });

    // Supprimer l'album
    const deletedAlbum = await AlbumModel.findByIdAndDelete(req.params.id);

    return { deletedAlbum, deletedSongs, deletedAppartients };
})

module.exports = {
    getAlbums,
    getAlbum,
    getAlbumSongs, 
    addAlbum, 
    addAlbumSong,
    updateAlbum,
    deleteAlbum
}