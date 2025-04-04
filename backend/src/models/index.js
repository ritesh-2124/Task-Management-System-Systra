const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Task = require('./tasks')(sequelize, DataTypes);

db.User.hasMany(db.Task, { foreignKey: 'userId' });
db.Task.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
