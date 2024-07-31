const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('login_crud_app_workanda', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;