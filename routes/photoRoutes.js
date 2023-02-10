const express = require('express')
const app = express()
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Get function")
    res.send("Welcome to the Unsplash API!");
  });
    

app.get("/api/photos", (req, res) => {
    console.log("Get PHOTOS function")
    try {
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server error. Please try again later."
        })
    }
  });

