const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');
const {StatusCodes} = require('http-status-codes');


//Criar Ingresso
const createTicket = async(req,res) =>{
  const {event : eventId} = req.body;
  const isValidEvent = await Event.findOne({_id: eventId});
  if(!isValidEvent){
    throw new CustomError.NotFoundError(`Nenhum evento encontrado com esse id: ${eventId}`);
  }

  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ticket})

}

//Listar todos ingressos
const getTickets = async(req,res)=>{
  const tickets = await Ticket.find({}).populate({
    path: 'Event',
    select: ''
  });
  res.status(StatusCodes.OK).json({tickets, count: tickets.length});
}

//Buscar ingresso especifico
const getTicket = async(req,res) => {
  const {id:ticketId} = req.params;
  const ticket = await Ticket.findOne({_id : ticketId})
  if(!ticket){
    throw new CustomError.NotFoundError(``)
  }
  res.status(StatusCodes.OK).json({ticket});


}


//Atualizar Ingresso
const updateTicket = async(req,res) => {
  const {id:ticketId} = req.params;
  const {tickPrice}  = req.body;
  const ticket = await Ticket.findOne({_id: ticketId});
  if(!ticket){

  }
  ticket.tickPrice = price;
  await ticket.save();
  res.status(StatusCodes.OK).json({ticket});

}

//Deletar Ingresso

const deleteTicket = async(req,res) =>{
  const {id:ticketId} = req.params;
  const ticket = await  Ticket.findOne({_id:ticketId});
  if(!ticket){

  }
  //checkPermission(req.user, ticket.user);
  await ticket.remove();
  res.status(StatusCodes.OK).json({msg: "Ingresso atualizado com sucesso!"})

}

//Filtrar ingresso por evento

const getSingleEventTicket = async(req,res)=>{
  const {id:eventId} = req.params
  const tickets = await Ticket.find({event:eventId});
  res.status(StatusCodes.OK).json({tickets, count : ticket.length})
}





module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
}