const homeController = require('../controllers/homeController');






const routesConfig = (app) => {

    app.use(homeController)
}



module.exports = routesConfig