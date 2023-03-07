const  {register, login } = require("../controllers/userController")
const express = require('express');
const app = express()
app.use(express.json());
const router = express.Router();    

router.post("/register", register)
router.post("/login", login)
// router.post("/logout", logout)

module.exports = router;
