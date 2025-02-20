const express = require('express');

const app = express();

app.use(
    "/user",
    [(req,res,next)=>{
        console.log("Handling route user 1!!");
        next();
       // res.send("response from 1st route handler ")
    },
    (req,res,next)=>{
        console.log("Handling route user 2!!");
       // res.send("response from 2nd route handler ")
        next();
    }],
    (req,res,next)=>{
        console.log("Handling route user 3!!");
    //    res.send("response from 3rd route handler ")
        next();
    },
    [(req,res,next)=>{
        console.log("Handling route user 4!!");
        res.send("response from 4th route handler ")
        next();
    }]
)


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
