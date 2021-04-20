const express = require('express')

const arduinoController = require('../controllers/arduino')

const router = express.Router();

// Arduino Routes
router.get('/arduino', arduinoController.getArduino)
router.post('/arduino', arduinoController.postArduino)
router.post('/arduinoAPI', arduinoController.postArduinoAPI)

module.exports = router;