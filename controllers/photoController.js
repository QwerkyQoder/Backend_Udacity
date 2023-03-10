//Require axios to make API calls
const axios = require("axios");
const asyncHandler = require("../middleware/errorMiddleware");

/******************************************************
 * @GETPHOTOS
 * @route http://localhost:3000/api/photos"
 * @description Get 10 random photos from Unsplasg
 * @parameters  
 * @returns Photo Object
 ******************************************************/
const getPhotos = asyncHandler (async (req, res) => {
    console.log("Get PHOTOS function")
    auth = "Client-ID " + process.env.UNSPLASH_ACCESS_KEY
    console.log(auth)
    let photos;
    try {
        let randomURL = `https://api.unsplash.com/photos/random/?count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`

        const resp = await axios.get(randomURL).then( data => {
          // the url of the random img
          console.log(data.data.length);
          photos = data.data.map((x) => {return x.urls.raw})
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

/******************************************************
 * @GETPHOTOSWITHID
 * @route http://localhost:3000/api/photos/:id"
 * @description Get photo of a given ID from Unsplash
 * @parameters  Phtoto ID
 * @returns Photo Object
 ******************************************************/
const getPhotoWithId = asyncHandler (async (req, res) => {
    console.log("Get PHOTO with ID function", req.params.id)
    let photoObj;
    try {
        let randomURL = `https://api.unsplash.com/photos/${req.params.id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        const resp = await axios.get(randomURL).then( data => {
          let photos = data.data
          photoObj = {id: photos.id,
            url: photos.urls.raw,
            description: photos.alt_description,
            username: photos.user.username
          } 
  
        });
          res.status(200).json({
            success:true,
            photos: photoObj,
          })
    } catch (error) {
        console.log("Error:", error.message)
        res.status(500).json({
            success:false,
            message: "Server error. Please try again later."
        })
    }
  })

/******************************************************
 * @GETPHOTOSWITHUSERNAME
 * @route http://localhost:3000/api/photos/user/:username"
 * @description Get photos of a particular user from Unsplash
 * @parameters  Username
 * @returns Photo Object
 ******************************************************/
const getPhotoWithUsername = asyncHandler ( async (req, res) => {
    console.log("Get PHOTO with username", req.params.username)
    let photos;
    try {

        let randomURL = `https://api.unsplash.com/users/${req.params.username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`

        const resp = await axios.get(randomURL).then( data => {
          // the url of the random img
          // photos = data.data.photos
          photos = data.data.photos.map((x) => {return {id: x.id,
            url: x.urls.raw,
            description: x.alt_description,
            username: req.params.username
          }
        })
        })

          res.status(200).json({
            success:true,
            photos: photos,
          })
    } catch (error) {
      console.log(error)
        res.status(500).json({
            success:false,
            message: "Server error. Please try again later."
        })
    }
  })

  module.exports = {getPhotos, getPhotoWithId, getPhotoWithUsername}