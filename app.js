require("dotenv").config();
const express = require('express')
const UserRoutes = require("./routes/photoRoutes")
const {createApi} = require('unsplash-js')

const app = express()

app.use(express.json());

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });


app.listen(3000, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`App listening on port 3000`)
  })

  app.get("/", (req, res) => {
    console.log("Get function")
    res.send("Welcome to the Unsplash API!");
  });
    

app.get("/api/photos", async (req, res) => {
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
  });

  app.get("/api/photos/:id", async (req, res) => {
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
  });

  app.get("/api/photos/user/:username", async (req, res) => {
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
  });

