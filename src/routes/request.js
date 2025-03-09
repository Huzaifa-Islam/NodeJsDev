const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId", userAuth ,async(req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    
    //Lets make it more correct and secure... by only allowing status value in the path param as interested and ignored and also if the connection req exist then do not create a new connection req btw the same users ans checking if toUserId exists in the db

    const allowedStatus = ["interested","ignored"]
    if (!allowedStatus.includes(status)){
      throw new Error("Status is not correct")
    }

    const toUserIdExists = await User.findById({
      _id:toUserId
    })
    if(!toUserIdExists){
      throw new Error ("To User Id Do Not Exist...")
    }

    const isConnectionRequestExist = await ConnectionRequest.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    });

    if (isConnectionRequestExist){
      throw new Error("Connection Already exists!!!")
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await connectionRequest.save();
    res.json({
      message:"Hi " + req.user.firstName + ",Connection request sent successfully to "+toUserIdExists.firstName,
      data:{
        connectionRequest
      }
    })
  } 
  catch(err){
    res.status(400).send("Error : "+ err.message)
  }
})

module.exports = requestRouter;