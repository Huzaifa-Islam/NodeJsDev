const express = require('express');

const app = express();

app.use(
    "/user",
    (req,res,next)=>{
        console.log("Handling route user 1!!");
        next();
       // res.send("response from 1st route handler ")
    },
    (req,res)=>{
        console.log("Handling route user 2!!");
        //res.send("response from 2nd route handler ")
    }
)


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
