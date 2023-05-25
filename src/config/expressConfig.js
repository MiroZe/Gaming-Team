const express = require('express')
const handlebars = require('express-handlebars'); 
const cookieParser = require('cookie-parser');



const expressConfig = (app) => {

    app.engine('hbs', handlebars.engine({extname: 'hbs'}));
    app.set('view engine', 'hbs');
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser())
    app.set(express.static('src/public'))



} 


module.exports = expressConfig