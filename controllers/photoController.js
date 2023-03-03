//Require axios to make API calls
const axios = require("axios");
const asyncHandler = require("../middleware/errorMiddleware");


const getPhotos = asyncHandler (async (req, res) => {
    console.log("Get PHOTOS function")
    auth = "Client-ID " + process.env.UNSPLASH_ACCESS_KEY
    console.log(auth)
    let photos;
    try {
        let randomURL = `https://api.unsplash.com/photos/random/?count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        console.log(randomURL)

        const resp = await axios.get(randomURL).then( data => {
          // the url of the random img
          console.log(data.data.length);
          photos = data.data
        });
        // await unsplash.photos.getRandom({
        //     count: 10,
        //   });
        //   console.log(photos)
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
    let photos;
    try {
        let randomURL = `https://api.unsplash.com/photos/${req.params.id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        console.log(randomURL)

        const resp = await axios.get(randomURL).then( data => {
          // the url of the random img
          console.log(data.data);
          photos = data.data
        });
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
    let photos;
    try {

        let randomURL = `https://api.unsplash.com/users/${req.params.username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        console.log(randomURL)

        const resp = await axios.get(randomURL).then( data => {
          // the url of the random img
          console.log(data.data.photos.length);
          photos = data.data.photos
        })
        // const photos = await unsplash.users.getPhotos({username: req.params.username,page: 1,
        //     perPage: 10,
        //     orderBy: 'latest',});        
        //   console.log(photos)
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