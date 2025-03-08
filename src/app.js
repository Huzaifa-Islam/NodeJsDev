const express = require("express");
const connectDB = require('./config/database')
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation");
const { blacklist } = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json()); // to read the body coming from the request 
app.use(cookieParser())

app.post("/signUp", async(req,res)=>{
  
  try{
    //validating data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;
    //encrypting password
    const passwordHash = await bcrypt.hashSync(password, 10)
    console.log("pwd hashed", passwordHash)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    })
    await user.save() // it will save this user in the database
    res.send("User added successfully")
  }
  catch(err){
    res.status(400).send("Error saving the user " + err.message)
  }
})

app.post("/login", async(req,res)=>{
  try{
    const{emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId})
    if(!user){
     throw new Error("Invalid credentials")
    }

    const isPassword = user.validatePassword(password)
    if (isPassword){
      // write a jwt token logic here
      const token = await user.getJWT();
      console.log("token", token)

      // pass it as a cookie in the response 
      res.cookie(
        "token", token, {
          expires: new Date(Date.now() + 3600000)
        }
      )
      res.send("User Logged in Successfully")
    }
    else{
      throw new Error("Password is incorrect")
    }
  }
  catch(err){
    res.status(400).send("Error : "+ err.message)
  }
})

app.get("/profile", userAuth ,async(req,res)=>{
  const user = req.user;
  res.send( user)
})

app.post("/sendConnectionRequest", userAuth ,async(req,res)=>{
  const user = req.user;
  console.log("sending a connection req");
  res.send(user.firstName + " send the connection req");

})

connectDB().then(()=>{
  console.log("Databse connection established...")
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch(err =>{
  console.log("Database cannot be connected")  })
  
