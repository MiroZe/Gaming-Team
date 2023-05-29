const express = require('express')
const handlebars = require('express-handlebars'); 
const cookieParser = require('cookie-parser');
const trimBody = require('../middleware/trimBody');
const hasUser = require('../middleware/userControl');



const expressConfig = (app) => {

    app.engine('hbs', handlebars.engine({extname: 'hbs'}));
    app.set('view engine', 'hbs');
    app.set('views', 'src/views')
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser())
    app.use(express.static('src/public'))
    app.use(hasUser)
    
    app.use(trimBody)



} 


module.exports = expressConfig