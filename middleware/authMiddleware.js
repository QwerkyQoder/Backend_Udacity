const User = require("../models/userModel")
const JWT = require('jsonwebtoken')
const asyncHandler = require('../middleware/errorMiddleware')
const CustomError = require('../CustomError')
// const config = require("../config/index.js")
const tokenList = require("../controllers/userController").tokenList

const isLoggedIn = asyncHandler(async(req, _res, next) => {
    let token;

    console.log("ISLOGGEDIN")
    console.log(req.headers.cookie)

    token = req.headers.authorization.split(" ")[1]
    console.log(token)

    try {
        const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET)
        //_id, find user based on id, set this in req.user
        req.user = await User.findById(decodedJwtPayload._id)

        console.log(tokenList)

        if(tokenList.indexOf(token) > -1)
        {
            next()
        }
        else
        {
            throw new CustomError('NOt authorized to access this route', 401)
        }
    } catch (error) {
        console.log(error)
        throw new CustomError('NOt authorized to access this route', 401)
    }
    
})

module.exports = isLoggedIn;