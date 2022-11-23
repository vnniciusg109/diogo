const mongoose = require ('../database');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


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
    },
    password: {
        type: String,
        required: true,
        minLenght: 7,
        trim:true,
    }
},{timestamps:true}
)

const UserTest = mongoose.model('UserTest', UserTestSchema)

module.exports = UserTest