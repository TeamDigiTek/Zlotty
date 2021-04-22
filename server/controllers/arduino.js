const Data = require('../model/data')
let body;

exports.postArduinoTalk = (req, res, next) => {
    body = req.body;
    console.log(req.body)
}


exports.getArduino = (req, res, next) => {
    res.json(body ? body : {"sensor": "0"})
}

exports.postArduino = (req, res, next) => {
    let obj = req.body
    keys = Object.keys(obj)
    console.log(keys)
    let json = {
        "temp": keys[0],
        "humid": keys[1]
    }
    const data = new Data({
        temp: Number(keys[0]),
        humid: Number(keys[1])
    })

    data
        .save()
        .then(result => {
            console.log('Created Data')
        })
        .catch(err => console.error(err))
}