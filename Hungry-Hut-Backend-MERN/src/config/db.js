require('dotenv').config();

const mongoose = require("mongoose")

const mongodbUrl = process.env.MONGOBD_URL;

async function connectDb() {
    return mongoose.connect(mongodbUrl);
}

module.exports = connectDb;