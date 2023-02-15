const express = require('express');
const { addFav, editFav, getFav, removeFav } = require('../controllers/favoritesController');
const app = express()
app.use(express.json());
const router = express.Router();
const isLoggedIn = require("../middleware/authMiddleware")

router.post("/add",isLoggedIn, addFav);
router.put("/edit",isLoggedIn, editFav);
router.get("/get", isLoggedIn, getFav);
router.delete("/remove", isLoggedIn, removeFav);

module.exports = router;