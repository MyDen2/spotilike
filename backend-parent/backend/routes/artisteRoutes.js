const express = require('express')
const router = express.Router()
const {
    getArtistSongs,
    updateArtiste,
    deleteArtist
} = require('../controllers/artisteController')

const { protect } = require('../middlewares/authMiddleware')

// router.get('/artistes', getAlbums) // endpoint 1
// router.get('/artistes/:id', getAlbum) // endpoint 2
router.get('/artistes/:id/songs', getArtistSongs) // endpoint 5
router.put('/artistes/:id', updateArtiste) // endpoint 10
router.delete('/artistes/:id', protect, deleteArtist) // endpoint 15

module.exports = router