const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const passport = require('passport');
const User_Model = require('./models/User_Model');

const app = express();
const port = process.env.PORT || 5000;

//session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    name: 'secret-name-session',
  }),
);
app.use(flash());

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) =>
  done(null, { id: user.idUser, userName: user.userName }),
);
passport.deserializeUser(async (user, done) => {
  const userDB = await User_Model.findByPk(user.id);
  return done(null, { id: userDB.idUser, userName: userDB.userName });
});

//-----------view engine--------------
const { create } = require('express-handlebars');

const hbs = create({
  extname: 'hbs',
  partialsDir: ['views/components'],
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');
//----------end view engine-------------

//middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.messages = req.flash('messages');
  next();
});
app.use('/', require('./routes/home.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.listen(port, () => console.log('Server on port  ' + port));
