const mongoose = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        require : true,
    },
    lastname: {
        type: String,
        require : true,
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
        validate:{
            validator:validator.isEmail,
            message:"Insira um e-mail valido"
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin','event','user'],
        select: ['user'],
    },   
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

})

UserSchema.methods.comparePassword = async function (userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword, this.password)

}


module.exports = mongoose.model('User', UserSchema)