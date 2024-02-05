const asyncHandler = require('express-async-handler')
const GenreModel = require('../models/genreModel')

const getGenres = asyncHandler(async (req, res) => {
    const genres = await GenreModel.find()
    res.status(200).json(genres)
})

const addGenre = asyncHandler(async (req, res) => {
    try {
        if (!req.body.titre || !req.body.description) {
            res.status(400).json({ success: false, message: 'Please provide title and description for the genre.' });
            return;
        }

        const genre = await GenreModel.create({
            titre: req.body.titre,
            description: req.body.description,
        });

        res.status(201).json({ success: true, data: genre });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding genre to the database.' });
    }
})

//12. PUT - /api/genres/:id : Modification du genre précisé par :id
const updateGenre = asyncHandler(async (req, res) => {
    try {
        const genre = await GenreModel.findById(req.params.id);

        if (!genre) {
            res.status(404).json({ success: false, message: 'Genre not found' });
            return;
        }

        const updatedGenre = await GenreModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Retourner le document mis à jour
            runValidators: true, // Appliquer les validateurs définis dans le schéma
        });

        res.status(200).json({ success: true, data: updatedGenre });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating genre in the database.' });
    }
})

module.exports = {
    getGenres,
    addGenre, 
    updateGenre
}
