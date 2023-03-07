//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("../middleware/errorMiddleware");
const favPhotoModel = require('../models/favoritePhotoModel')
const CustomError = require('../CustomError')
const isLoggedIn = require('../middleware/authMiddleware')
const mongoose = require("mongoose")

/******************************************************
 * @ADDFAV
 * @route http://localhost:3000/api/user/fav/add
 * @description Add favorite photo to user profile
 * @parameters  url, description, username, explanation
 * @returns Fav photo Object
 ******************************************************/

const addFav = asyncHandler(async (req, res, next) => {
    const {url, description, username, explanation } = req.body

    const existingUrl = await favPhotoModel.findOne({url:url, userid: req.user.id})
    if(existingUrl) {
        throw new CustomError('URL already exists', 400)  
    }

    const favPhoto = await favPhotoModel.create({
        userid: req.user.id,
        url,
        description,
        username, 
        explanation
    });

    res.status(200).json({
        success: true,
        favPhoto,
    })


})

/******************************************************
 * @REMOVEFAV
 * @route http://localhost:3000/api/user/fav/remove/:id
 * @description Remove favorite photo from user profile
 * @parameters  photo ID
 * @returns Fav photo Object
 ******************************************************/

const removeFav = asyncHandler(async (req, res) => {
    console.log("REMOVEFAV", req.user._id)
    const fav = await favPhotoModel.findByIdAndDelete (req.params.id)
    console.log(fav)
    if(!fav) {
        throw new CustomError('Favorites not found', 400)  
    }
    res.status(200).json({
        success: true,
        fav,
    })
})

/******************************************************
 * @EDITFAV
 * @route http://localhost:3000/api/user/fav/edit/:id
 * @description EDIT explanation of favorite photo from user profile
 * @parameters  photo ID
 * @returns Fav photo Object
 ******************************************************/

const editFav = asyncHandler(async (req, res) => {
    console.log("EDITFAV", req.user._id)
    req.body.userid = req.user.id
    const fav = await favPhotoModel.findByIdAndUpdate(req.params.id, {explanation: req.body.explanation})
    if(!fav) {
        throw new CustomError('Favorites not found', 400)  
    }
    res.status(200).json({
        success: true,
        fav,
    })
})

/******************************************************
 * @GETFAV
 * @route http://localhost:3000/api/user/fav/get
 * @description Get all favorite photos from user profile
 * @parameters  User ID
 * @returns list of Fav photo Object
 ******************************************************/
const getFav = asyncHandler(async (req, res) => {
    console.log("GETFAV", req.user._id)
    const allfavs = await favPhotoModel.find ({userid: req.user._id})
    console.log(allfavs)
    if(!allfavs) {
        throw new CustomError('Favorites not found', 400)  
    }
    res.status(200).json({
        success: true,
        allfavs,
    })

})

module.exports = {addFav, removeFav, editFav, getFav}