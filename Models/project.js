const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    project:{
        type: String,
        required: true
    },
    task:{
        type: String,
        required: true
    },
    user:{
        type: String 
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Project', projectSchema)
