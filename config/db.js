const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Cinema', 'marichka0406', '123123123123123', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
          trustedConnection: true, 
          trustServerCertificate: true
        }
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
});

module.exports = sequelize;