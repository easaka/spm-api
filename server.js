require("dotenv").config()
const express = require("express")


const routes  = require('./routes/routes')


const mongoose = require("mongoose")
const mongoURL = process.env.DATABASE_URI
mongoose.connect(mongoURL)

const app = express()


app.use(express.json())
app.use('/api', routes)

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen('3000',()=>{
    console.log('it works');
})
