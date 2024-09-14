const mongoose = require("mongoose")


const connectTODatabase = async () => {
    mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
       console.log('MongoDB Connected!')
})
}

module.exports = connectTODatabase