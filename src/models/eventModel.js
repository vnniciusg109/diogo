const mongoose = require ("../database")


const EventSchema = new mongoose.Schema({
   
    eventname:{
        type: String,
        required: true,
        unique:true
    },

    eventday:{
        type:String , 
        required: true
    },

    description:{
        type:String
        ,required:true
    },

    type:{
        type:String,
         required:true
    },

    location:{
        type:String,
         required:true
    },

    created_at : {
        type : Date,
        default : Date.now
    },
})


const Event = mongoose.model("Event",EventSchema);

module.exports = Event;


