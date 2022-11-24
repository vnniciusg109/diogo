const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const TicketSchema = new Schema({

    tickName :{
         type : String , 
         required : true
    },

    tickPrice:{ 
        type : Number, 
        required : true
    },

    tickLocal :{
        type : String ,
        required : true
    },

    tickGender  : {
        type : String,  
        required : true
    },

    tickYear: {
        type: Number,
        required: true,
    },

    tickType: {
        type: String,
        required: true,
    },
    
    }
)

module.exports = Ticket = mongoose.model("Ticket",TicketSchema);

