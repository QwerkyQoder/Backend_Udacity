const express = require('express')
const app = express()

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Get function")
    res.send("Welcome to the Unsplash API!");
  });
    
  
app.listen(3000, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`App listening on port 3000`)
  })

