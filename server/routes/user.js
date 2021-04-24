const express = require('express')

const userController = require('../controllers/user')

const router = express.Router();

// Vores bruger router, denne sørger for at vi kan tilgå siderne på de angivende paths
// Eks. https://zlotty.herokuapp.com/talk tilgår userController.getTalk og skaffer talk siden med vores ML på.
router.get('/', userController.getIndex)
router.get('/talk', userController.getTalk)

module.exports = router;