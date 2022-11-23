const mongoose = require ('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

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
    
    ownerTicket : {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    },{timestamps:true}
)
    


const Ticket = mongoose.model("Ticket",TicketSchema);

module.exports = Ticket
