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
    console.log(json)
}