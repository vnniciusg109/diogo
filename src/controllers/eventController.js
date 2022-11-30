const Event = require('../models/eventModel');
const {StatusCodes} = require('http-status-codes');


//Criar Evento
const createEvent = async(req,res) =>{
    req.body.evPromoter = req.user.userId;
    req.body.evTicket = req.ticket.ticketId;
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({event});
}

//Listar todos os eventos

const getEvents = async(req,res) =>{
    const events = await Event.find( { } );
    res.status(StatusCodes.OK).json({events, count:events.length});

}

//Listar evento em especifico
const getEvent = async(req,res) =>{
    const event  = await Event.findOne({_id:req.params.id}).populate('tickets');
    
    if(!event){
        res.status(200).json({msg:"Nenhum evento encontrado!"})
    }

    res.status(StatusCodes.OK).json({ticket})


}


//Atualizar evento
const updateEvent = async(req,res) =>{
    const event = await Event.findOneAndUpdate({_id: req.params.id}, req.body{
        new:true,
        runValidators:true,
    });
    if(!event){
        res.status(200).json({msg:"Nenhum evento encontrado!"})
    }
    res.status(StatusCodes.OK).json({ticket})

}

//Deletar Evento
const deleteEvent = async(req,res) =>{
    const event = await Event.findOne({_id: req.params.id});
    if(!event){
        res.status(200).json({msg:"Nenhum evento encontrado!"})
    }
    await event.remove();
    res.status(StatusCodes.OK).json({msg: "Evento deletado com sucesso!"})


}

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,

}