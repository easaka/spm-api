const express = require('express')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user')
const sendVerificationEmail = require('../utils/sendEmail')


//Sign Up
const signUp = async (req,res)=>{
    const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('All fields are required')
        }
        const user = new userModel({ name, email, password });
        await user.save();


        const token = crypto.randomBytes(16).toString('hex');
        user.verificationToken = token;
        user.verificationTokenExpiry = Date.now() + 3600000;
        await user.save();
        sendVerificationEmail.sendVerificationEmail(user.email, token);
        res.send('A verification email has been sent to your email address.');
}

module.exports = {
    signUp
}
