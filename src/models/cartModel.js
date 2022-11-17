const mongoose = require ("../database")


const CartSchema = new mongoose.Schema({

    vendor_id : [{
        type: String,
        required : true,
    }],

    ticket_id: [{
        type: String ,
        required : true,
    }],

    price: [{
        type: String, 
        required : true
    }]


})



const Cart = mongoose.model("Cart",CartSchema);

module.exports = Cart
