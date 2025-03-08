const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require('../utils/validation')

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
  try{
    console.log("going to validation")
    if(validateEditProfileData(req)===false){
      throw new Error("Invalid Edit request")
    }
    const loggedInUser = req.user;
    console.log("user before update " + loggedInUser)
    Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key])
    loggedInUser.save();
    console.log("user after update " + loggedInUser)
    res.send("Profile Edited Successfully")
  }
  catch(err){
    res.status(400).send("Error : "+ err.message)
  }

 
})

module.exports = profileRouter;
