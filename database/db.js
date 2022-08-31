const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbUrlTwitch', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() =>
    console.log('Database connection has been established successfully.'),
  )
  .catch(e => console.error('Unable to connect to the database:', e.message));

module.exports = sequelize;
