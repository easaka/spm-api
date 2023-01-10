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
        type: String,
        required: true
    }
    
})


module.exports = mongoose.model('Project', projectSchema)
