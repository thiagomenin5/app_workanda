const sequelize = require('../config/database.js');
const User = require('./user.js');

sequelize.sync()
    .then(()=>console.log('Base de datos sincronizada'))
    .catch(err=> console.log('Error al sincronizar la base de datos', err));

module.exports = {
    User
};