const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user")
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res) => {
  try {
    //validating data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //encrypting password
    const passwordHash = await bcrypt.hashSync(password, 10);
    console.log("pwd hashed", passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save(); // it will save this user in the database
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassword = user.validatePassword(password);
    if (isPassword) {
      // write a jwt token logic here
      const token = await user.getJWT();
      console.log("token", token);

      // pass it as a cookie in the response
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
      });
      res.send("User Logged in Successfully");
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async(req,res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })

  res.send("Logged out successfully")
})

module.exports = authRouter;
