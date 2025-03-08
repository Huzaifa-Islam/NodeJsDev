const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth ,async(req,res)=>{
  const user = req.user;
  console.log("sending a connection req");
  res.send(user.firstName + " send the connection req");

})

module.exports = requestRouter;