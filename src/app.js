const express = require("express");
const connectDB = require('./config/database')
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors"); // to allow the request from different domain

app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
))
app.use(express.json()); // to read the body coming from the request 
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");  
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(()=>{
  console.log("Databse connection established...")
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch(err =>{
  console.log("Database cannot be connected")  })
  
