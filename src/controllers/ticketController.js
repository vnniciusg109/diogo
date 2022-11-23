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
const createTicket = async(req,res) => {
  try{
    const newTicket = new Ticket ({
      ...req.body,
      ownerTicket : req.user._id
    })
    await newTicket.save()
    res.status(201).send(newTicket)
  }catch(error){
    res.status(400).send({message: "error"})
  }
}


//Atualizar Ingresso
const updateTicket = async(req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [''] //Inserir campos que podem ser alterados
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
  if(!isValidOperation){
    return res.status(400).send({error:'invalid updates'})
  }

  try{
    const ticket = await Ticket.findOne({_id : req.params.id})
    if(!ticket){
      return res.status(404).send()
    }
    updates.forEach((update) => ticket[update] = req.body[update])
    await item.save()
    res.send(ticket)
  }catch(error){
    res.status(400).send(error)
  }



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
  createTicket,
  updateTicket,
  deleteTicket,
}