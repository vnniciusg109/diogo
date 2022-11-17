const mongoose = require ("../database")


const CartSchema = new mongoose.Schema({

    price :{
        type: Number,
        required : true,
    },
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
