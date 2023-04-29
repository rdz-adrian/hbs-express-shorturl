const router = require('express').Router();
const {
  getUrls,
  createUrl,
  deleteUrl,
  getToUpdate,
  updateUrl,
  redirectTo,
  getProfile,
} = require('../controllers/home.controller');
const ulrValidar = require('../middlewares/urlValida');
const { userValidation } = require('../middlewares/authValidator');

router.get('/', userValidation, getUrls);
router.post('/', userValidation, ulrValidar, createUrl);
router.get('/delete/:id', userValidation, deleteUrl);
router.get('/update/:id', userValidation, getToUpdate);
router.post('/update/:id', userValidation, ulrValidar, updateUrl);
router.get('/profile', userValidation, getProfile)

router.get('/:shortURL', redirectTo);

module.exports = router;
