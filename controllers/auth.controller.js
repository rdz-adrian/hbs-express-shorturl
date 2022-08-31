const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const User_Model = require('../models/User_Model');

const registerForm = (req, res) => res.render('pages/register');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('messages', errors.array());
    return res.redirect('/auth/register');
  }

  const { userName, email, password } = req.body;

  try {
    let user = await User_Model.findOne({ where: { email }, raw: true });
    if (user) throw new Error('There is already a user with this account');

    user = new User_Model({
      userName,
      email,
      password,
      tokenConfirm: nanoid(),
    });
    await user.save();

    //TODO: send email whith the account confirmation
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.userEmail,
        pass: process.env.userEmailPassword,
      },
    });

    await transporter.sendMail({
      from: '"Adrian Rodríguez Acosta 👻" <aracosta2810@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Verication email', // Subject line
      html: `<a href="http://localhost:${process.env.PORT}/auth/confirm/${user.tokenConfirm}">Confirm email here</a>`, // html body
    });

    req.flash('messages', [
      { msg: 'Check your email to validate your account' },
    ]);
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/auth/register');
  }
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User_Model.findOne({ where: { tokenConfirm: token } });
    if (!user) throw new Error('This user does not exist');

    user.cuentaConfirmada = true;
    user.tokenConfirm = null;

    await user.save();

    req.flash('messages', [{ msg: 'Account confirmed! Please log in' }]);
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/auth/login');
  }
};

const loginForm = (req, res) => res.render('pages/login');

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('messages', errors.array());
    return res.redirect('/auth/login');
  }

  const { email, password } = req.body;
  try {
    const user = await User_Model.findOne({ where: { email } });
    if (!user) throw new Error('This email does not exist');
    if (!user.cuentaConfirmada)
      throw new Error(
        'You have to access your email to confirm the account before',
      );

    if (!(await bcryptjs.compare(password, user.password)))
      throw new Error('Incorrect password');

    req.login(user, function (err) {
      if (err) throw new Error('Error al crear sesión');
      return res.redirect('/');
    });
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/auth/login');
  }
};

const logoutUser = async (req, res) => {
  req.logout(function (err) {
    if (err) throw new Error('Error al cerrar sesión');
    return res.redirect('/auth/login');
  });
};

module.exports = {
  logoutUser,
  loginForm,
  registerForm,
  registerUser,
  confirmAccount,
  loginUser,
};
