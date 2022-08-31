require('dotenv').config();
require('./app');
// require('./models/URL_Model');
// require('./models/User_Model');
const sequelize = require('./database/db');

// sequelize.sync({ alter: true })
