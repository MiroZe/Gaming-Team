const { verifyToken } = require("../sevices/userService")


const hasUser = (req, res, next) => {

    const token = req.cookies.token
    if(token) {

        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.id = userData._id
            res.locals.email = userData.email
        } catch (error) {
            res.clearCookie('token')
            res.redirect('/auth/login')
            return
        }
       
    }
    next()

}

module.exports = hasUser