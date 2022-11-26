require('dotenv').config()
const mongoose = require('mongoose')
function connectDb() 
{

    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost:27017/Quizzing", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const con = mongoose.connection
    con.on('open', () => {
        console.log("database connected in mongo");
    })
}

module.exports = connectDb