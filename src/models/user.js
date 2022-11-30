const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserTestSchema = new mongoose.Schema({
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
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    password2: {
        type: String,
        required: true,
        select: false,
    },   
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const UserTeste = mongoose.model('UserTeste', UserTestSchema)

module.exports = UserTeste