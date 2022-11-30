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
        userId:{
            type:String,
        },
        name:String,
        type:String,
        //required:true
    }],

    evTicket :[{
        ticketId:{
            type:String,
        },
        nameTick:String,
        priceTick:Number,
        //required:true
    }]
    
},{timestamps:true}
)

module.exports = Event = mongoose.model("Event",EventSchema);