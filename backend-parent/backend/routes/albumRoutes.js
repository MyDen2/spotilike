const express = require('express')
const router = express.Router()
const {
    getAlbums,
    getAlbum,
    getAlbumSongs, 
    addAlbum, 
    addAlbumSong,
    updateAlbum,
    deleteAlbum
} = require('../controllers/albumController')

const { protect } = require('../middlewares/authMiddleware')

router.get('/albums', getAlbums) // endpoint 1
router.get('/albums/:id', getAlbum) // endpoint 2
router.get('/albums/:id/songs', getAlbumSongs) // endpoint 3
router.post('/albums/:id/songs', addAlbumSong) // endpoint 9
router.post('/albums', addAlbum) // endpoint 12
router.put('/albums/:id', updateAlbum)
router.delete('/albums/:id', protect, deleteAlbum) // endpoint 14
module.exports = router