// routes/artistRoutes.js
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// Route to get artist
router.get('/:artistId', artistController.getArtist);

// Route to add a new user
//router.post('/', artistController.addUser);

module.exports = router;
