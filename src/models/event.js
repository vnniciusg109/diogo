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
})

const Event = mongoose.model("Event",EventSchema);

module.exports = Event;


