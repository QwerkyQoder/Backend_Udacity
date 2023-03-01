const express = require('express')
const app = express()
app.use(express.json());
const router = express.Router();
const {getPhotos, getPhotoWithId, getPhotoWithUsername} = require('../controllers/photoController')



router.get("/",getPhotos);
router.get("/:id", getPhotoWithId);
router.get("/user/:username", getPhotoWithUsername);

module.exports = router;