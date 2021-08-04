const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    access_token:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model("Token",tokenSchema);