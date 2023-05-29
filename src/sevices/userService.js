const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { log } = require('console')



const JWT_SECRET = '54354325khjh414ee'

async function register(username, email, password) {

    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })

    if (existingEmail) {
        throw new Error('This email is already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        email,
        hashedPassword
    })

    return createSession(user)

}


async function login(email, password) {

    const existingUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })

    if (!existingUser) {
        throw new Error('Email doesnt exist or password is incorrect! ')
    }

    const passwordCheck = await bcrypt.compare(password, existingUser.hashedPassword)
    
    if (!passwordCheck) {
        throw new Error('Email doesnt exist or password is incorrect! ')
    }
    return token = createSession(existingUser)

 

}




function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}


async function createSession({ _id, username, email }) {

    const payloud = {
        _id,
        username,
        email
    }

    return token = jwt.sign(payloud, JWT_SECRET)


}


module.exports = {
    register,
    login,
    verifyToken,

}