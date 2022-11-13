const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const PartnerSchema = new mongoose.Schema({
    eventEmail: {
        type: String,
        require : true,
    },
    eventName: {
        type: String,
        require : true,
    },
    eventCnpj: {
        type: String,
        unique: true,
        required: true,
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

PartnerSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const Partner = mongoose.model('Partner', PartnerSchema)

module.exports = Partner