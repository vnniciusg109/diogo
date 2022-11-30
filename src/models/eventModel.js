const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    
    evFile :{
        type:String,
    },

    evName:{
        type:String,
        required:true,
    },
    evState:{
        type:String,
        required:true,
    },
    evLocal:{
        type:String,
        required:true
    },
    evDate:{
        type:Date,
        required:true
    },
    evYear:{
        type:Number,
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

    evPromoter:[{
        type : Schema.Types.ObjectId,
        ref : 'User',
        //required:true
    }],

    evTicket :[{
        type : Schema.Types.ObjectId,
        ref: 'Ticket',
        //required:true
    }]
    
},{timestamps:true}
)

module.exports = Event = mongoose.model("Event",EventSchema);