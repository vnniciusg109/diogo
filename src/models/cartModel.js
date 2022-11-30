const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema ({

    userId:{
        type:String,
    },

    tickets :[{
       type
    }],
    bill:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports = Cart = mongoose.model('Cart',cartSchema);