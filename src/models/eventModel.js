const mongoose = require ("../database")


const EventSchema = new mongoose.Schema({
   
    evFile:{
        type: String,
        required: true,
    },

    evName:{
        type:String , 
        required: true
    },

    evState:{
        type:String
        ,required:true
    },

    evLocal:{
        type:String,
         required:true
    },
    
    evDate:{
        type:String,
         required:true
    },

    evYear:{
        type:String,
         required:true
    },

    evType:{
        type:String,
         required:true
    },

    evOverview:{
        type:String,
         required:true
    },

    //evTicket :[{
        //type: mongoose.Schema.Types.ObjectId , ref : "Ticket"
    //}],

    created_at : {
        type : Date,
        default : Date.now
    },

})


const Event = mongoose.model("Event",EventSchema);

module.exports = Event;


