const Ticket = require('../models/ticketModel');



//Listar todos os ingressos
const getTickets = ((req, res) => {
  res.json(Ticket)
})


//Listar ingresso especifico
const getTicket = ((req, res) => {
  const id = Number(req.params.ticketID)
  const ticket = Ticket.find(ticket => ticket.id === id)

      if (!ticket) {
      return res.status(404).send('Ticket not found')
  }
  res.json(ticket)
})


//Criar Ingresso
const createTicket = ((req, res) => {
  const newTicket = {
      id: Ticket.length + 1,
      tickName: req.body.tickName,
      tickPrice: req.body.tickPrice,
      tickLocal : req.body.tickLocal,
      tickGender : req.body.tickGender,
      tickYear : req.body.tickYear,
      tickType : req.body.tickType,
      tickVendor : req.body.tickVendor,
  }
  Ticket.push(newTicket)
  res.status(201).json(newTicket)
})


//Atualizar dados do ingresso
const updateTicket = ((req, res) => {
  const id = Number(req.params.ticketID)
  const index = Ticket.findIndex(ticket => ticket.id === id)
  const updatedTicket = {
      id: Ticket[index].id,
      tickName: req.body.tickName,
      tickPrice: req.body.tickPrice,
      tickLocal : req.body.tickLocal,
      tickGender : req.body.tickGender,
      tickYear : req.body.tickYear,
      tickType : req.body.tickType,
      tickVendor : req.body.tickVendor,
      
  }

  Ticket[index] = updatedTicket
  res.status(200).json('ticket updated')
})


//Deletar Ingresso
const deleteTicket = ((req, res) => {
  const id = Number(req.params.ticketID)
  const index = Ticket.findIndex(ticket => ticket.id === id)
  Ticket.splice(index,1)
  res.status(200).json('ticket deleted')
})


module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket
}