const express = require('express')

const arduinoController = require('../controllers/arduino')

const router = express.Router();

// Arduino Routes
router.get('/arduino', arduinoController.getArduino)
router.post('/arduino', arduinoController.postArduino)
router.post('/arduinoTalk', arduinoController.postArduinoTalk)

module.exports = router;