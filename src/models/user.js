const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLenght: 20
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value){
        if(!["male","female"].includes(value)){
            throw new Error("Gender data is not correct")
        }
    }
  },
  photoUrl:{
    type: String,
    min: 18,
  },
  about:{
    type: String,
    default:"This is just to see the default value"
  },
  skills:{
    type: [String]
  }
},
{
    timestamps:true
}
);

userSchema.methods.getJWT = async function(){
  const user = this; // this keywords only work with normal functions not with arrow functions
  const token = await jwt.sign({_id: user._id},"SecretKeyJWT!@#$%12345Done", {expiresIn: "1d"});
  return token;
}

// for password validation
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isValidPassword;
}


const User =  mongoose.model("User", userSchema)

module.exports = User;