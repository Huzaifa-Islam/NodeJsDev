const mongoose = require("mongoose");

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

const User =  mongoose.model("User", userSchema)

module.exports = User;