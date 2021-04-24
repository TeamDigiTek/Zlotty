const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Med mongoose kan vi direkte skabe en model for vores database.
// Modellen vil indeholde Temperatur, Humidity, Date.
// Dette sikrer at vi kan tilgå vores data direkte gennem modellen og sikre at der ikke bliver byttet rundt eller tabt data.
// Modellen opbevarer alle værdier fra Arduinoen som numrer og alle tre værdier skal være tilstede før dokumentet bliver sendt til databasen.
const dataSchema = new Schema({
    temp: {
        type: Number,
        required: true
    },
    humid: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
})

// Her gør vi modellen tilgængelig udefra resten af Express appen.
module.exports = mongoose.model('data', dataSchema)