const mongoose = require ('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId


const EventSchema = new mongoose.Schema({
   
    evFile:{
        type: String,
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
    
    //evTicket :{
        //type: ObjectID,
        //required : true,
        //ref: 'Ticket'
    //},

    },{timestamps:true}
)


const Event = mongoose.model("Event",EventSchema);

module.exports = Event;


