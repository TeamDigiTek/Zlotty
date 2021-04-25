const express = require('express')

const apiController = require('../controllers/api')

const router = express.Router();

// Vores API router, denne sørger for at vi kan tilgå API siden på den angivende path
// Eks. https://zlotty.herokuapp.com/api tilgår apiController.getDB og gør det muligt for os at tilgå dataen fra vores database.
router.get('/api', apiController.getDB)

module.exports = router;