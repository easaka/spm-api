require("dotenv").config()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
const mongoURL = process.env.DATABASE_URL
mongoose.connect(mongoURL)
