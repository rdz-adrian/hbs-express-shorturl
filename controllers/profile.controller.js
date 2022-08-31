const getProfile = (req, res) => {
    res.render('pages/profile', { user: req.user });
}

module.exports = {
    getProfile
}