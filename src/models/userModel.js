const mongoose = require ('../database');
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const JWT_SECRET = process.env.JWT_SECRET


const UserTestSchema = new mongoose.Schema({
    username: {
        type: String,
        require : true,
        trim : true,
        lowercase:true

    },
    lastname: {
        type: String,
        require : true,
        trim : true,
        lowercase:true
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    pnumber: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLenght: 7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password mus\'t contain password')
            }
        }
    },

    tokens :[{
        token:{
            type:String,
            required:true
        }
    }]

},{timestamps:true}
)


//Gerar Token
UserTestSchema.methods.generateAuthToken = async function(){
    const user= this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//Login 
UserTestSchema.statics.findByCredentials = async(email,password) =>{
    const user = await UserTest.findOne({email})
    if(!user){
        throw new Error("Unable to log in")
    }

    const isMatch = await bcrypt.compare(password,user.password)
    console.log(isMatch)

    if(!isMatch){
        throw new Error("Unable to log in")
    }

    return user
}


//Hash Senha
UserTestSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})



const UserTest = mongoose.model('UserTest', UserTestSchema)

module.exports = UserTest