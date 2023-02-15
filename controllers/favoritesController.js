//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("../middleware/errorMiddleware");
const favPhotoModel = require('../models/favoritePhotoModel')
const CustomError = require('../CustomError')
const isLoggedIn = require('../middleware/authMiddleware')

const addFav = asyncHandler(async (req, res, next) => {
    const {url, description, username } = req.body


    // for user id get from token?
    console.log(req.user)
    

    console.log("ADDFAV", req.body)

    const existingUrl = await favPhotoModel.findOne({url})
    if(existingUrl) {
        throw new CustomError('URL already exists', 400)  
    }

    const favPhoto = await favPhotoModel.create({
        userid: req.user.id,
        url,
        description,
        username
    });

    res.status(200).json({
        success: true,
        favPhoto,
    })


})

const removeFav = asyncHandler(async (req, res) => {

})

const editFav = asyncHandler(async (req, res) => {

})

const getFav = asyncHandler(async (req, res) => {

})

module.exports = {addFav, removeFav, editFav, getFav}