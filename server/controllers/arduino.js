const moment = require('moment')
const Data = require('../model/data')
let body;

exports.postArduinoTalk = (req, res, next) => {
    body = req.body;
    console.log(req.body)
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header("Access-Control-Allow-Headers", "accept, content-type");
        res.header("Access-Control-Max-Age", "1728000");
    return res.sendStatus(200);
}

exports.getArduino = (req, res, next) => {
    res.json(body ? body : {"sensor": "0"})
}

exports.postArduino = (req, res, next) => {
    let obj = req.body
    keys = Object.keys(obj)
    console.log(keys)
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