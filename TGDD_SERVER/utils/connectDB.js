const mongoose = require("mongoose")
const MONGO_URL = "mongodb://root:example@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

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
