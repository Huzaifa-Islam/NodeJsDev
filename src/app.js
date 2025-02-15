const express = require('express');

const app = express();

//app.use accepts all the HTTP methods

app.get('/user/:userId', (req,res)=>{
    console.log(req.params); // this is how we get the parameters from the URL
    res.send({firstName:"John", lastName:"Doe"});
})

//http://localhost:3000/user?id=123
app.get('/user', (req,res)=>{
    console.log(req.query); // this is how we get the query params from the URL
    res.send({firstName:"John", lastName:"Doe"});
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
