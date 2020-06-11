const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {//connecting with server
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to foodAPI postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;