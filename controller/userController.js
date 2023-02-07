const express = require('express')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user')
const sendVerificationEmail = require('../utils/sendEmail');
const jwtSecret = crypto.randomBytes(64).toString('hex');


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

const verifyEmail = async (req,res)=>{
   const token = req.query.token

   if (!token){
    return error
   }
   const decoded=jwt.verify(token,jwtSecret)
   const user = await userModel.findById(decoded._id)

   if(!user){
    return error
   }

   if (user.verified === true){
    return error
   }

   user.verified=true
   await user.save()

   res.send('Email verified')


}

module.exports = {
    signUp,
    verifyEmail
}
