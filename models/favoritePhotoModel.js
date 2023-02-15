const mongoose = require("mongoose")

const favPhotoSchema = mongoose.Schema({
    // User registered ID
    userid: {
        type:  mongoose.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    url: {
        type: String,
        required: [true, "Url is required"],
    },
    description: {
        type: String,
    },
    // Unsplash user name of the photos
    username: {
        type: String,
        required: [true, "Username is required"],
        maxLength: [50, "Username must be less than 50"]
    },
});


module.exports = mongoose.model("FAvPhoto", favPhotoSchema)