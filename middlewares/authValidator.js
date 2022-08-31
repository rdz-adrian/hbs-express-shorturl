const { body } = require('express-validator');

const loginValidator = [
  body('email', 'Incorrect email').trim().isEmail().normalizeEmail(),
  body('password', 'Password must to be at least 6 characters')
    .trim()
    .isLength({ min: 6 })
    .escape(),
];

const registerValidator = [
  body('userName', 'Incorrect user name').trim().notEmpty().escape(),
  body('email', 'Incorrect email').trim().isEmail().normalizeEmail(),
  body('password', 'Password must to be at least 6 characters')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.repeatpassword)
        throw new Error('The provided passwords are not the same');
      return value;
    }),
];

const userValidation = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
};

module.exports = {
  userValidation,
  loginValidator,
  registerValidator,
};
