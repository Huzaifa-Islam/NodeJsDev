const validator = require('validator');

const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if (validator.isEmail(emailId)==false){
        throw new Error("Email is not valid")
    }
    else if (validator.isStrongPassword(password)==false){
        throw new Error("Password is not strong")
    }
}

const validateEditProfileData = (req) =>{
    console.log("validation")
    const allowedFieldsToUpdate = ["emailId", "firstName", "lastName", "age", "about", "skills"]
    const allowUpdate = Object.keys(req.body).every((key) => allowedFieldsToUpdate.includes(key))
    return allowUpdate
}

module.exports = 
{validateSignUpData, validateEditProfileData};