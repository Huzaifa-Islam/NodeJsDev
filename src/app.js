const express = require('express');

const app = express();

app.use(
    "/user",
    (req,res)=>{
        console.log("Handling route user 1!!");
    }
)


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
