const User = require("../models/userModel")
const JWT = require('jsonwebtoken')
const asyncHandler = require('../middleware/errorMiddleware')
const CustomError = require('../CustomError')
// const config = require("../config/index.js")

const isLoggedIn = asyncHandler(async(req, _res, next) => {
    let token;

    console.log("ISLOGGEDIN")
    // console.log(req.cookies)
    console.log(req.headers.cookie)
    // console.log()
    // if (
    //     req.headers.cookie || req.cookies.token ||
    //     (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    //     ) {
    //     token = req.headers.cookie || req.cookies.token || req.headers.authorization.split(" ")[1]
    //     console.log(token)
    // }

    token = req.headers.authorization.split(" ")[1]
    console.log(token)

    // if (!req.headers.cookie) {
    //     throw new CustomError('NOt authorized to access this route', 401)
    // }

    try {
        const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET)
        //_id, find user based on id, set this in req.user
        req.user = await User.findById(decodedJwtPayload._id)
        next()
    } catch (error) {
        console.log(error)
        throw new CustomError('NOt authorized to access this route', 401)
    }
    
})

module.exports = isLoggedIn;