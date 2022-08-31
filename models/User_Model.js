const bcryptjs = require('bcryptjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const URLMODEl = require('./URL_Model');

const User_Model = sequelize.define(
  'users',
  {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenConfirm: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    cuentaConfirmada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  },
  {
    timestamps: false,
  },
);

User_Model.hasMany(URLMODEl);
URLMODEl.belongsTo(User_Model);

//Hook to hash password before saving it in the database
User_Model.beforeCreate(async (user, options) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
  } catch (error) {
    console.log(error);
  }
});

module.exports = User_Model;
