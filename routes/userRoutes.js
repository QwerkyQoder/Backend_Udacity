const  {signUp, login, logout } = require("../controllers/userController")
const express = require('express')
const app = express()
app.use(express.json());
const router = express.Router();    

const User = require("../models/userModel")

router.post("/register", signUp)
router.get("/login", login)
router.put("/logout", logout)
// router.delete("/me", getUser)




module.exports = router;
