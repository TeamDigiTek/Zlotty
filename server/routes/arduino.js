
const express = require('express')

const arduinoController = require('../controllers/arduino')

const router = express.Router();

// Vores Arduino router, denne sørger for at vi kan tilgå siderne på de angivende paths
// Eks. https://zlotty.herokuapp.com/arduinoTalk tilgår arduinoController.postArduinoTalk og gør det muligt for os at opdatere getArduino, så Arduinoen kan hente opdateret data.
router.get('/arduino', arduinoController.getArduino)
router.post('/arduino', arduinoController.postArduino)
router.post('/arduinoTalk', arduinoController.postArduinoTalk)

module.exports = router;