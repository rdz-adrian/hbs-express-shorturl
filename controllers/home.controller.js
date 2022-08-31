const URLMODEl = require('../models/URL_Model');
const { nanoid } = require('nanoid');

const getUrls = async (req, res) => {
  try {
    const urls = await URLMODEl.findAll({
      raw: true,
      where: { userIdUser: req.user.id },
    });
    res.render('pages/home', { urls, user: req.user });
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/auth/login');
  }
};

const createUrl = async (req, res) => {
  const { origin } = req.body;
  const test = new URLMODEl({
    origin,
    shortURL: nanoid(6),
    userIdUser: req.user.id,
  });
  try {
    await test.save();
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
  }
  return res.redirect('/');
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await URLMODEl.findOne({ where: { id } });
    if (!(url.userIdUser === req.user.id))
      throw new Error('It is not your url');

    await URLMODEl.destroy({ where: { id } });
    req.flash('messages', [{ msg: 'Url deleted!' }]);
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
  }
  return res.redirect('/');
};

const getToUpdate = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await URLMODEl.findOne({ where: { id }, raw: true });
    if (!(url.userIdUser === req.user.id))
      throw new Error('It is not your url');

    res.render('pages/home', { url: url, user: req.user });
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/');
  }
};

const updateUrl = async (req, res) => {
  const { id } = req.params;
  const { origin } = req.body;

  try {
    const url = await URLMODEl.findOne({ where: { id }, raw: true });
    if (!(url.userIdUser === req.user.id))
      throw new Error('It is not your url');

    await URLMODEl.update({ origin }, { where: { id } });
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
  }
  return res.redirect('/');
};

const redirectTo = async (req, res) => {
  const { shortURL } = req.params;

  try {
    const url = await URLMODEl.findOne({ where: { shortURL }, raw: true });
    res.redirect(url.origin);
  } catch (error) {
    req.flash('messages', [{ msg: 'This url does not exist' }]);
    res.redirect('/auth/login');
  }
};

module.exports = {
  getUrls,
  createUrl,
  deleteUrl,
  getToUpdate,
  updateUrl,
  redirectTo,
};
