const mongoose = require ("../database")


const CartSchema = new mongoose.Schema({

    vendor_id : [{
        type: mongoose.Schema.Types.ObjectId ,
        ref : " ",
    }],

    ticket_id: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref : "Ticket",
    }],

    event_id: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref : "Event",
    }],

    price: [{
        type: String, 
        required : true
    }]


    //tickSeller : [{type:mongoose.Schema.Types.ObjectId, ref : "User"}],

})



const Cart = mongoose.model("Cart",CartSchema);

module.exports = Cart
