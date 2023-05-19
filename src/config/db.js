const mongoose = require('mongoose');
const { config } = require('dotenv');
config({
    path: "./.env"
})
const mongoDBUrl = process.env.DB;

const conn = async() => {
    const { connection } = await mongoose.connect(mongoDBUrl)
    console.log("database connected");
}


module.exports = conn;