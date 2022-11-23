const mongoose = require ('../database');
const ObjectID = mongoose.Schema.Types.ObjectId


const CartSchema = new mongoose.Schema({

    owner :{
        type:ObjectID,
        required:true,
        ref:'User'
    },
    tickets:[{
        TicketId:{
            type:ObjectID,
            required :true,
            ref:'Ticket'
        },
        name:String,
        quantity:{
            type:Number,
            required:true,
            min:1,
            default:1,
            price:Number
        }
    }],

    bill:{
        type:Number,
        required:true,
        default:0
    },

    },{timestamps:true}
)




const Cart = mongoose.model("Cart",CartSchema);

module.exports = Cart
