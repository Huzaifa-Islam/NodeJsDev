const express = require('express');

const app = express();

app.use(
    "/user",
    (req,res,next)=>{
        console.log("Handling route user 1!!");
        next();
       // res.send("response from 1st route handler ")
    },
)
//make sure the path is "/user" only else we will get 404 not found if we change "/user" to something else like "/user2" wont work. Or if we have this route "/" then the control can go to that route handler and send back the response
app.use(
    "/user",
    (req,res,next)=>{
        console.log("Handling route user 2!!");
        res.send("response from 2nd route handler ")
    },
)


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
