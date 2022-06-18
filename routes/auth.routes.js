const { loginForm, registerForm, registerUser, confirmAccount, loginUser } = require('../controllers/auth.controller');

const router = require('express').Router()

router.get("/register", registerForm);
router.post("/register", registerUser);
router.get('/confirm/:token', confirmAccount)
router.get("/login", loginForm);
router.post("/login", loginUser);

module.exports = router;