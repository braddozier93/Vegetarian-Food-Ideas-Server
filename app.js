//dotenv
require('dotenv').config();
//express
const express = require('express');
const app = express();
//controllers
const foods = require('./controllers/foodcontroller');
const users = require('./controllers/usercontroller');
//database
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));
//listen
app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
});
//routes
app.use('/user', users);
app.use(require('./middleware/validate-session'));
app.use('/food', foods);


