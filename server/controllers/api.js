const Data = require('../model/data')

exports.getDB = (req, res, next) => {
    Data.find()
        .then(data => {
            res.json(data)
        })
}