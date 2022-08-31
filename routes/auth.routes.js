const {
  loginForm,
  registerForm,
  registerUser,
  confirmAccount,
  loginUser,
  logoutUser,
} = require('../controllers/auth.controller');
const {
  loginValidator,
  registerValidator,
} = require('../middlewares/authValidator');

const router = require('express').Router();

router.get('/register', registerForm);
router.post('/register', registerValidator, registerUser);
router.get('/confirm/:token', confirmAccount);
router.get('/login', loginForm);
router.post('/login', loginValidator, loginUser);
router.get('/logout', logoutUser);

module.exports = router;
