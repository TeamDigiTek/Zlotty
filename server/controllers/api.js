const Data = require('../model/data')

exports.getDB = (req, res, next) => {
    Data.find({date: { $gte: (Date.now() - (86400 * 1000))}})
        .then(data => {
            res.json(data)
        })
}