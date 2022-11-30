const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')
const{checkPermission} = require('../utils')


//Criar Ingresso
const createTicket = async(req,res) =>{
  const {event:eventId}  = req.body;
  const isValidEvent = await Event.findOne({_id:eventId});
  if(!isValidEvent){
    throw new CustomError.NotFoundError(`Nao ha ingressos com o id: ${req.params.id}`)
  }
  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ticket})
}

//Listar todos ingressos
const getTickets = async(req,res)=>{
  const tickets = await Ticket.find({}).populate({
    path:'event',
    select:'evName evLocal evDate',
  });
  res.status(StatusCodes.OK).json({tickets, count: tickets.length});
}

//Buscar ingresso especifico
const getTicket = async(req,res) => {
  const {id:ticketId} = req.params;
  const ticket = await Ticket.findOne({_id : ticketId})
  if(!ticket){
    throw new CustomError.NotFoundError(`Nao ha ingressos com o id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ticket});

}

//Atualizar Ingresso
const updateTicket = async(req,res) => {
  const{id:ticketId} = req.params;
  const{tickName,tickPrice,tickLocal,tickGender,tickYear,tickType} = req.body;
  const ticket = await Ticket.findOne({_id : ticketId})
  
  if(!ticket){
    throw new CustomError.NotFoundError(`Nao ha ingressos com o id: ${req.params.id}`)
  }

  checkPermission(req.user,ticket.user);
  ticket.tickGender = tickGender;
  ticket.tickName = tickName;
  ticket.tickPrice = tickPrice;
  ticket.tickLocal = tickLocal;
  ticket.tickYear =tickYear;
  ticket.tickType = tickType;

  await ticket.save();
  res.status(StatusCodes.OK).json({ticket});
}

//Deletar Ingresso

const deleteTicket = async(req,res) =>{
  const {id:ticketId} = req.params;
  const ticket = await  Ticket.findOne({_id:ticketId});
  if(!ticket){
    throw new CustomError.NotFoundError(`Nao ha ingressos com o id: ${req.params.id}`);
  }
  checkPermission(req.user,ticket.user);
  await ticket.remove();
  res.status(StatusCodes.OK).json({msg: "Ingresso Removido com sucesso!"})
}

const getSingleEventTicket = async(req,res)=>{
  const{id:eventId} = req.params;
  const tickets = await Ticket.find({event:eventId})
  res.status(StatusCodes.OK).json({tickets, count:tickets.length})
}


module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getSingleEventTicket
  
}