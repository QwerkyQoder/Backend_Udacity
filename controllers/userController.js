//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const User = require('../models/userModel')
const CustomError = require('../CustomError')
const asyncHandler = require("../middleware/errorMiddleware");


const cookieOptions = {
    // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //could be in a separate file in utils
}

const tokenList = [];

/******************************************************
 * @REGISTER
 * @route http://localhost:3000/api/user/register
 * @description User Register Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/
const register = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body

    console.log("REGISTER", req.body)

    if (!username || !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }
    //check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError('User already exists', 400)  
    }

    const user = await User.create({
        username,
        email,
        password
    });
    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    tokenList.push(token)
    console.log(tokenList)

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})

/******************************************************
 * @LOGIN
 * @route http://localhost:3000/api/user/login
 * @description User Login Controller for loging new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ( !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
        throw new CustomError('Invalid credentials', 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (isPasswordMatched) {
        const token = user.getJwtToken()
        user.password = undefined;

        if(tokenList.includes(token)) {
            throw new CustomError('ALready logged in', 201)
        }
        tokenList.push(token)
        console.log(tokenList)


        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError('Invalid credentials - pass', 400)

})


/******************************************************
 * @LOGOUT
 * @route http://localhost:3000/api/user/logout
 * @description User logout bby clearing user cookies
 * @parameters  
 * @returns success message
 ******************************************************/
const logout = asyncHandler(async (req, res) => {
    // res.clearCookie()
    token = req.headers.authorization.split(" ")[1]

    const index = tokenList.indexOf(token)
    if(index !== -1) {
        tokenList.splice(index, 1);
    }
    console.log(tokenList)

    res.clearCookie('jwt_token');
    // req.session.destroy(); 

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

module.exports = {cookieOptions, register, login, logout, tokenList}