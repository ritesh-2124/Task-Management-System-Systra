const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres', 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false,
});

// Test connection function
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully using Sequelize');
  } catch (err) {
    console.error('Error connecting to the database using Sequelize:', err);
  }
};

testConnection();

module.exports = sequelize
