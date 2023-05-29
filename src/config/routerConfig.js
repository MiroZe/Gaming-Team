const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController')





const routesConfig = (app) => {

    app.use(homeController)
    app.use('/auth', authController)

    app.get('*', (req,res) => {
        res.redirect('/404')
    })
}



module.exports = routesConfig