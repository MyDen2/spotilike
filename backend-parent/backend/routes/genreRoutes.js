const express = require('express')
const router = express.Router()
const {
    getGenres,
    addGenre, 
    updateGenre
} = require('../controllers/genreController')
router.get('/genres', getGenres) // endpoint 4
router.post('/genres', addGenre) // endpoint en plus
router.put('/genres/:id', updateGenre) // endpoint 12
module.exports = router