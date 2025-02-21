const express = require("express");
const connectDB = require('./config/database')
const app = express();
const User = require("./models/user")

app.post("/signUp", async(req,res)=>{
  console.log("call is made")
  //creating a new instance of the user model
  const userObj = new User( {
    firstName: "Huzaifa",
    lastName:"Islam",
    emailId:"Huzaifa@Islam.com",
    password:"Huzaifa@123"
  })
  try{
    await userObj.save() // it will save this user in the database
    res.send("User added successfully")
  }
  catch(err){
    res.status(400).send("Error saving the user " + err.message)
  }
  
})

connectDB().then(()=>{
  console.log("Databse connection established...")
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch(err =>{
  console.log("Database cannot be connected")  })
  
