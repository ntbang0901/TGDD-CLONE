const mongoose = require("mongoose")
const MONGO_URL = "mongodb://0.0.0.0:27017/TGDD"

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL) 
        console.log(">>>>>>>>>>>>>>>> Connect Successfully! <<<<<<<<<<<<<<<<<")
    } catch (error) {
        console.log(error)
        console.log("Connect fail!")
    }
}

module.exports = { connectMongoDB }
