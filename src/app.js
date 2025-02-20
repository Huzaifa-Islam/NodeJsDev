const express = require("express");
const app = express();

const {adminAuth} = require("./middlewares/auth")
const {userAuth} = require("./middlewares/auth")
//Auth middleware for all requests GET, POST, etc for apis starting with /admin
app.use("/admin", adminAuth)

app.get("/admin/getAllData",  (req, res, next) => {
    res.send("added a user")
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});

app.get("/user/getUserData", userAuth, (req,res,next)=>{
    try{
        throw new Error("sdkjfn"); //throwing error forcefully
        res.send("User data sent")    
    }
    catch(err){
        res.status(500).send("Some error occured contact support team")
    }
})

//Error Handling

app.use("/",(err,req,res,next)=>{
    if (err){
        res.status(500).send("something went wrong")
    }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
