const  {register, login, logout } = require("../controllers/userController")
const express = require('express')
const app = express()
app.use(express.json());
const router = express.Router();    

router.post("/register", register)
router.get("/login", login)
router.put("/logout", logout)

module.exports = router;
