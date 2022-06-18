const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');


const URLMODEl = sequelize.define('urls', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    shortURL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    timestamps: false
})

module.exports = URLMODEl