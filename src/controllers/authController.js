const { register, verifyToken } = require('../sevices/userService');
const parseError = require('../utils/parseError');

const authController = require('express').Router();


authController.get('/login', (req,res) => {
    res.render('login', {title: 'Login page'})
})

authController.get('/register', (req,res)=> {
    res.render('register' , {title : 'Register Page'})
})


authController.post('/register', async (req,res)=> {

    try {
      
        if(req.body.password < 4 ) {
            throw new Error('Password should be at least four characters long')
        }
        if(req.body.password != req.body.repassword) {
            throw new Error('Password confirmation should be equal to the password')
        }
        const token = await register(req.body.username,req.body.email, req.body.password )
        res.cookie('token' , token)
        res.redirect('/')
    } catch (error) {
        const userData =  {
            username :req.body.username,
            email: req.body.email, 
            
        }

        
        res.render('register', {
            title: 'Register Page',
            userData,
            errors: parseError(error)
        })
    }
   


})

module.exports = authController