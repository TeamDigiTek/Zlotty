// Vores index side. Her sender vi vores index side sammen med sidens titel og path.
exports.getIndex = (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'Home',
        path: '/',
    })
}
// Vores ML talk side. Her sender vi vores ML talk side sammen med sidens titel og path.
exports.getTalk = (req, res, next) => {
    res.render('user/talk', {
        pageTitle: 'Talk',
        path: '/talk'
    })
}

