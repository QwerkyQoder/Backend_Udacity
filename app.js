require("dotenv").config();
const express = require('express')
const connectDB = require("./config/db");
const favoritePhotoModel = require("./models/favoritePhotoModel");
const PhotoRoutes = require("./routes/photoRoutes")
const UserRoutes = require("./routes/userRoutes")
const favoritesRoutes = require("./routes/favoritesRoutes")

const app = express()

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}))

// app.use(cors())
// app.use(cookieParser())


connectDB();

app.listen(process.env.PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`App listening on port ${process.env.PORT}`)
  })

  app.get("/", (req, res) => {
    console.log("Get function")
    res.send("Welcome to the Unsplash API!");
  });
    

  app.use("/api/photos", PhotoRoutes);
  app.use("/api/user", UserRoutes);
  app.use("/api/user/fav/", favoritesRoutes)