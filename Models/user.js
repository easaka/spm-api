const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    verified: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  });

module.exports = mongoose.model('User', userSchema)
