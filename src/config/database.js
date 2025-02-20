const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://officialhuzaifacoder:R4YRBHpiVCV8Cgvy@learnnodejs.pxt95.mongodb.net/"
    )
} 

connectDB().then(()=>{
console.log("Databse connection established...")
}).catch(err =>{
console.log("Database cannot be connected")
})
