const moment = require('moment')
const Data = require('../model/data')
let body;

// Denne controller sørger for at vi kan sende data fra /talk til /arduino så vi kan tilgå den opdaterede data.
// Vi sætter også headers her så vi undgår CORS problemer.
exports.postArduinoTalk = (req, res, next) => {
    body = req.body;
    console.log(req.body)
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header("Access-Control-Allow-Headers", "accept, content-type");
        res.header("Access-Control-Max-Age", "1728000");
    return res.sendStatus(200);
}

// Denne controller sørger for at Arduinoen kan hente den data den skal bruge for at udføre sine opgaver baseret på hvad der bliver tilsent fra postArduinoTalk.
// Hvis der ikke kommer noget svar fra postArduinoTalk, så sætter vi automatisk svaret til 0, hvilket er lig default på Arduinoen.
// Sensor er et arbitrær navn. Ikke tænk over det.
exports.getArduino = (req, res, next) => {
    res.json(body ? body : {"sensor": "0"})
}

// Når Arduinoen sender sin Temp og Humid data, så er det her vi modtager den.
// Vi tager dataen fra req.body og ekstrakter den. Herefter danner vi et nyt MongoDB document og sender det til MongoDB Atlas.
exports.postArduino = (req, res, next) => {
    let obj = req.body
    keys = Object.keys(obj)
    const data = new Data({
        temp: Number(keys[0]),
        humid: Number(keys[1]),
        date: moment(Date.now())
    })

    data
        .save()
        .then(result => {
            console.log('Created Data: ', result)
        })
        .catch(err => console.error(err))
}