const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');





const routesConfig = (app) => {

    app.use(homeController)
    app.use('/auth', authController)
    app.use('/game', gameController)

    app.get('*', (req,res) => {
        res.redirect('/404')
    })
}



module.exports = routesConfig