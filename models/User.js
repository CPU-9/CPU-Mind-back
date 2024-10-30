// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // db.js에서 sequelize 인스턴스를 가져옴

const User = sequelize.define('User', {

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
