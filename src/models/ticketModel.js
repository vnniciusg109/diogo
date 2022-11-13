const mongoose = require ('../database')

const TicketSchema = new mongoose.Schema({

    tickName :{
         type : String , 
         required : true
    },

    tickPrice:{ 
        type : String, 
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
        type: String,
        required: true,
     },

    tickType: {
        type: String,
        required: true,
     },

    created_at : {type : Date,default : Date.now},
    //user : [{type:mongoose.Schema.Types.ObjectId,  ref : 'User'}],

})


const Ticket = mongoose.model("Ticket",TicketSchema);

module.exports = Ticket
