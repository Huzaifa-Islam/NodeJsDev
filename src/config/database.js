const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://officialhuzaifacoder:alLJQgA3zYmkOa31@learnnodejs.pxt95.mongodb.net/devTinder"
    )
} 

module.exports = connectDB
