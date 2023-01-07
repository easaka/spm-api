require("dotenv").config()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
const mongoURL = process.env.DATABASE_URI
mongoose.connect(mongoURL)
