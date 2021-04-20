let body;

exports.postArduinoAPI = (req, res, next) => {
    body = req.body;
    console.log(req.body)
}


exports.getArduino = (req, res, next) => {
    res.json({"sensor": 5})
}

exports.postArduino = (req, res, next) => {
    console.log(req)
    console.log(req.body)
}