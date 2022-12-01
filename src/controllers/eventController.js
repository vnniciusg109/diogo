const Event = require('../models/eventModel');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

//Criar Evento
const createEvent = async(req,res) =>{
    req.body.promoter = req.user.userId;
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({event});
}

//Listar todos os eventos

const getEvents = async(req,res) =>{
    const events = await Event.find({});
    res.status(StatusCodes.OK).json({events});
}

//Listar evento em especifico
const getEvent = async(req,res) =>{
    const event  = await Event.findOne({_id:req.params.id}).populate('tickets');
    if(!event){
        throw new CustomError.NotFoundError(`Nao ha eventos com o id: ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({event})
}

//Atualizar evento
const updateEvent = async(req,res) =>{
    const event = await Event.findOneAndUpdate({_id: req.params.id}, req.body,{
        new:true,
        runValidators:true,
    });
    if(!event){
        throw new CustomError.NotFoundError(`Nao ha eventos com o id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({event});
}

//Deletar Evento
const deleteEvent = async(req,res) =>{
    const {id:eventId} = req.params;
    const event = await  Event.findOne({_id:eventId});
    if(!event){
      throw new CustomError.NotFoundError(`Nao ha eventos com o id: ${req.params.id}`);
    }
    await event.remove();
    res.status(StatusCodes.OK).json({msg: "Ingresso Removido com sucesso!"})
  
  }


module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,

}