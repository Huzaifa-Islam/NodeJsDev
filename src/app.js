const express = require("express");
require("./config/database")
const connectDB = require('./config/database')
const app = express();

connectDB().then(()=>{
  console.log("Databse connection established...")
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch(err =>{
  console.log("Database cannot be connected")  })
  
