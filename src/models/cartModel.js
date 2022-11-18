const mongoose = require ("../database")


const CartSchema = new mongoose.Schema({

    total_price : {
        type:Number,
        required:true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    ticket_id :[{
        type:mongoose.Schema.Types.ObjectId , ref : "Ticket"
    }],

    buyer_id :[{
        type:mongoose.Schema.Types.ObjectId , ref: "User"
    }]

})



const Cart = mongoose.model("Cart",CartSchema);

module.exports = Cart
