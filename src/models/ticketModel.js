const mongoose = require ('../database')

const TicketSchema = new mongoose.Schema({

    tickFile :{
        type:String,
    },

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

    //tickSeller : [{type:mongoose.Schema.Types.ObjectId, ref : "User"}],
    //tickEvent : [{type:mongoose.Schema.Types.ObjectId, red: "Event"}]

    created_at : {type : Date,default : Date.now},
    

})


const Ticket = mongoose.model("Ticket",TicketSchema);

module.exports = Ticket
