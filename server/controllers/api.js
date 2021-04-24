const Data = require('../model/data')

// Her tilgår vi vores database og henter data fra MongoDB Atlas.
// Vi specificerer her at vi kun vil hente data fra den seneste dag (Sidste 24 timer).
// Når vi har hentet den data, så svarer vi tilbage med et JSON objekt der indeholder dataen fra Mongo.
exports.getDB = (req, res, next) => {
    Data.find({date: { $gte: (Date.now() - (86400 * 1000))}})
        .then(data => {
            res.json(data)
        })
}