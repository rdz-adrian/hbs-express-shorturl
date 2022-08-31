const { URL } = require('url');

const validarURL = (req, res, next) => {
  try {
    const { origin } = req.body;
    const urlFrontend = new URL(origin);
    if (urlFrontend.origin !== 'null') {
      if (
        urlFrontend.protocol === 'http:' ||
        urlFrontend.protocol === 'https:'
      ) {
        return next();
      }
    }
    throw new Error('Invalid url 😲');
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/');
  }
};

module.exports = validarURL;
