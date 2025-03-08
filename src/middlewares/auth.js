const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //Read the token from the req cookies
    const token = req.cookies.token;

    // Validate the token
    if (!token) {
      throw new Error("Token is not found");
    }

    const decoded = await jwt.verify(token, "SecretKeyJWT!@#$%12345Done");

    //Find the user by id
    const { _id } = decoded;
    console.log("decoded", decoded);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    //attach user to req object so that again i do not have to find the user object
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = { userAuth };
