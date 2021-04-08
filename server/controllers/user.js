exports.getIndex = (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'Home',
        path: '/'
    })
    console.log(req)
}
exports.getTalk = (req, res, next) => {
    res.render('user/talk', {
        pageTitle: 'Talk',
        path: '/talk'
    })
    console.log(req)
}

