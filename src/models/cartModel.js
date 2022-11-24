const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema ({

    userId:{
        type:String,
    },

    tickets :[{
        ticketId:{
            type:String,
        },
        name:String,
        quantity:{
            type:Number,
            required:true,
            min:[1,'A quantidade nao pode ser menor que 1.'],
            default:1
        },
        price:Number,
    }],
    bill:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports = Cart = mongoose.model('Cart',cartSchema);