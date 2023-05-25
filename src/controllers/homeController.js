const homeController = require('express').Router();




homeController.get('/', (req,res)=> {
    res.send('Hello')
})


module.exports = homeController