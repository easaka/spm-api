const express = require('express')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user')
const token = require('../Models/token')
const sendVerificationEmail = require('../utils/sendEmail');
const User = require('../Models/user');
const Token = require('../Models/token');
const bcrypt = require("bcrypt")
const jwtSecret = crypto.randomBytes(64).toString('hex');


//Sign Up
const signUp = async (req,res)=>{
    const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('All fields are required')
        }
        const user = new User({ name, email, password });
        await user.save();


       const token = await new Token({
        userID:user._id,
        token: crypto.randomBytes(32).toString('hex')
       }).save()
    //    console.log(token.token);
        sendVerificationEmail.sendVerificationEmail(user.email, token.token,user._id);
        res.send('A verification email has been sent to your email address.');
}


// verify Email
const verifyEmail = async (req,res)=>{

    const user = await User.findOne({_id:req.params.id})
    if(!user)return res.status(400).send({message: "Invalid Link"})

    const token = await Token.findOne({
        userID: user._id,
        token: req.params.token
    })
    // console.log(token.token)
    if(!token)return res.status(400).send({message: "invalid Link"})

    await user.updateOne({_id:user._id, verified:true})
    await token.remove()

    res.status(200).send({message: "Email verified"})
}

// login

const login = async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if (!user)return res.status(401).send({message: "Invalid Email or Password"})

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)return res.status(401).send({message:"Invalid Email or Password"})

    if(!user.verified){
        let token = await Token.findOne({userID: user.id})
        if (!token){
            token = await new Token({
                userID:user._id,
                token: crypto.randomBytes(32).toString('hex')
               }).save()
        }
        sendVerificationEmail.sendVerificationEmail(user.email, token.token,user._id);
        res.send('A verification email has been sent to your email address.');
    }
    res.status(200).send({message:"Login successful"})
}

module.exports = {
    signUp,
    verifyEmail,
    login
}
