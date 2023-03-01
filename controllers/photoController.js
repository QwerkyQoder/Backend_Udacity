//Require axios to make API calls
const axios = require("axios");
const asyncHandler = require("../middleware/errorMiddleware");
const {createApi} = require('unsplash-js')

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });


const getPhotos = asyncHandler (async (req, res) => {
    console.log("Get PHOTOS function")
    try {
        const photos = await unsplash.photos.getRandom({
            count: 10,
          });
          console.log(photos)
          res.status(200).json({
            success:true,
            photos: photos,
          })
    } catch (error) {
        console.log("Error:", error.message)
        res.status(500).json({
            success:false,
            message: "Server error. Please try again later."
        })
    }
  })

const getPhotoWithId = asyncHandler (async (req, res) => {
    console.log("Get PHOTO with ID function", req.params.id)
    try {
        const photos = await unsplash.photos.get({photoId: req.params.id});        
          console.log(photos)
          res.status(200).json({
            success:true,
            photos: photos,
          })
    } catch (error) {
        console.log("Error:", error.message)
        res.status(500).json({
            success:false,
            message: "Server error. Please try again later."
        })
    }
  })

const getPhotoWithUsername = asyncHandler ( async (req, res) => {
    console.log("Get PHOTO with username", req.params.username)
    try {
        const photos = await unsplash.users.getPhotos({username: req.params.username,page: 1,
            perPage: 10,
            orderBy: 'latest',});        
          console.log(photos)
          res.status(200).json({
            success:true,
            photos: photos,
          })
    } catch (error) {
        console.log("Error:", error.message)
        res.status(500).json({
            success:false,
            message: "Server error. Please try again later."
        })
    }
  })

  module.exports = {getPhotos, getPhotoWithId, getPhotoWithUsername}