const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://officialhuzaifacoder:R4YRBHpiVCV8Cgvy@learnnodejs.pxt95.mongodb.net/devTinder"
    )
} 

module.exports = connectDB
