const router = require('express').Router()
const { getUrls, createUrl, deleteUrl, getToUpdate, updateUrl, redirectTo } = require('../controllers/home.controller');
const ulrValidar = require('../middlewares/urlValida');

router.get('/', getUrls)
router.post('/', ulrValidar, createUrl)
router.get('/delete/:id', deleteUrl)
router.get('/update/:id', getToUpdate)
router.post('/update/:id', ulrValidar, updateUrl)
router.get('/:shortURL', redirectTo)
module.exports = router;