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

module.exports.createTicket =(req,res) =>{
  const newTicket = new Ticket(req.body);
  newTicket.save().then(ticket => res.json(ticket))
}

//Atualizar Ingresso
module.exports.updateTicket = (req,res) => {
  Ticket.findByIdAndUpdate({_id: req.params.id},req.body).then(function(ticket){
    Ticket.findOne({_id: req.params.id}).then(function(ticket){
          res.json(ticket);
      });
  });
}


//Deletar Ingresso
const deleteTicket = ((req, res) => {
  Ticket.findOneAndDelete({ _id: req.params.ticketID })
      .then(result => res.status(200).json({ result }))
      .catch((error) => res.status(404).json({msg: 'Ticket not found' }))
})



module.exports = {
  getTickets,
  getTicket,
  deleteTicket,
}