const mongoose = require ('../database')

const TicketSchema = new mongoose.Schema({
    name:{ type : String , required : true},
    price:{ type : String, required : true},
    type :{ type : String , required : true},
    lote : {type : String,  required : true},
    status: { type: String, required: true, default: "a venda" },
    created_at : {type : Date,default : Date.now},
    //user : [{type:mongoose.Schema.Types.ObjectId,  ref : 'User'}],

})


const Ticket = mongoose.model("Ticket",TicketSchema);

module.exports = Ticket
