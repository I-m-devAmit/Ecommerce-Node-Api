const mongoose = require('mongoose');   
const validator = require('validator');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       trim: true,
       lowercase: true
     },
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
         validate( value ) {
               if( !validator.isEmail( value )) {
                    throw new Error("Email is not valid")
                     }
                }
      },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
           if( value.toLowerCase().includes("password")) {
           throw new Error("password must not contain password");
          }
       }
    },
    tokens: [{
      token: {
      type: String,
      required: true
        }
      }]
    }, {
    timestamps: true
    })

//Generate auth token
    userSchema.methods.generateAuthToken = async function () {
        const user = this
        const token =jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
    }

    //login in users 
    userSchema.statics.findByCredentials = async (email , password) => {
        const user = await User.findOne({email})
        if(!user) {
            throw new Error("Unable to log in")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if(!isMatch) {
            throw new Error("Unable to log in")
        }
        return user
    }

    //Hash plain password before saving 
    userSchema.pre('save', async function(next){
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()

    })


    const User = mongoose.model('User', userSchema)
    module.exports = User