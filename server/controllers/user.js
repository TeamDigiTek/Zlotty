exports.getIndex = (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'Home',
        path: '/',
    })
}
exports.getTalk = (req, res, next) => {
    res.render('user/talk', {
        pageTitle: 'Talk',
        path: '/talk'
    })
}

