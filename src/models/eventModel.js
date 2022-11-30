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
    evCategory:{
        type:String,
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

    promoter:[{
        type : Schema.Types.ObjectId,
        ref : 'User',
        //required:true
    }],
    
},{
    timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
});

EventSchema.virtual('tickets',{
    ref:'Ticket',
    localField:'_id',
    foreignField:'event',
    justOne:false,
})

EventSchema.pre('remove', async function(next){
    await this.model('Event').deleteMany({event:this._id});
})

module.exports = mongoose.model("Event",EventSchema);