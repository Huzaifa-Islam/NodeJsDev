const express = require("express");
const connectDB = require('./config/database')
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation");
const { blacklist } = require("validator");
const bcrypt = require("bcrypt");

app.use(express.json()); // to read the body coming from the request 

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

    const isPassword = bcrypt.compareSync(password, user.password) 
    if (isPassword){
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

//Find user by email
app.get("/user", async (req,res)=>{
  console.log("call to get user is made")
  const userEmail = req.body.emailId;
  try{
     const user = await User.find({emailId: userEmail})
     if (user.length==0){
      res.status(404).send("User not found")  
     }
     res.send(user);
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }
})
// suppose two users with same email id and then only one user (i have seen only first one inserted in the db being returned)
app.get("/getOneUser", async (req,res)=>{
  console.log("call to get user is made")
  const userEmail = req.body.emailId;
  try{
     const user = await User.findOne({emailId: userEmail})
     if (user.length==0){
      res.status(404).send("User not found")  
     }
     res.send(user);
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }
})

//Feed Api - get all the users from the database
app.get("/feed", async(req,res)=>{

  try{
    const users = await User.find();
    if (users.length==0){
      res.status(404).send("No users")
    }
    res.send(users)
  }
  catch(err){
res.status(400).send("Something went wrong")
  }
})

//delete a user
app.delete("/user", async(req,res)=>{
  const userId = req.body.userId;
  console.log("delete request made", userId)
  try{
//    const user = await User.findByIdAndDelete({id:userId}) // we can do it like this or the way i have done it below    
    const user = await User.findByIdAndDelete(userId)
    res.send("User deleted successfully")
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }
})

//update data of the user
app.patch("/user", async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body
  try{
    const user = await User.findByIdAndUpdate({_id:userId}, data, {
      returnDocument:"before",
      runValidators:true
    });
    console.log("trying third parameter options which is optional .. read the official docs "+ user)
    res.send("User updated successfully")
  }
  catch(err){
    res.status(400).send("Something went wrong --"+err.message);
  }
})

connectDB().then(()=>{
  console.log("Databse connection established...")
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch(err =>{
  console.log("Database cannot be connected")  })
  
