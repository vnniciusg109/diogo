const Ticket = require('../models/ticketModel');


//Listar todos ingressos
const getTickets = ((req, res) => {
  Ticket.find({})
      .then(result => res.status(200).json({ result }))
      .catch(error => res.status(500).json({msg: error}))
})

//Buscar ingresso especifico
const getTicket = ((req, res) => {
  Ticket.findOne({ _id: req.params.ticketID })
      .then(result => res.status(200).json({ result }))
      .catch(() => res.status(404).json({msg: 'Ticket not found'}))
})

//Criar Ingresso
const createTicket = ((req, res) => {
  Ticket.create(req.body)
      .then(result => res.status(200).json({ result }))
      .catch((error) => res.status(500).json({msg:  error }))
})


//Atualizar Ingresso
const updateTicket = ((req, res) => {
  Ticket.findOneAndUpdate({ _id: req.params.ticketID }, req.body, { new: true, runValidators: true })
      .then(result => res.status(200).json({ result }))
      .catch((error) => res.status(404).json({msg: 'Ticket not found' }))
})


//Deletar Ingresso
const deleteTicket = ((req, res) => {
  Ticket.findOneAndDelete({ _id: req.params.ticketID })
      .then(result => res.status(200).json({ result }))
      .catch((error) => res.status(404).json({msg: 'Ticket not found' }))
})



module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
}