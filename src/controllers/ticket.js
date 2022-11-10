const Ticket = require('../models/ticket');
const express = require('express');
const router = express.Router();


//Listar Ingresso
router.get('/list', async(req,res)=> {
  try{
  const tickets = await Ticket.find({});
  return res.json(tickets);
 }catch(err){
  res.send(err);
 }
})

//Criar Ingresso
router.post('/create', async(req,res) =>{
  try{
    const ticket = await Ticket.create(req.body);
    return res.json(ticket);
  }catch(err){
    res.send(err);
  }
})

//Atualizar Ingresso

router.put('/update',async(req,res) => {
  try{
    const ticket = await Ticket.findById(req.params.id);
    console.log(ticket);
    ticket.name = req.body.name;
    ticket.price = req.body.price;
    ticket.type = req.body.type;
    ticket.lote = req.body.lote;
    ticket.status = req.body.status;
    const updatedTicket = await ticket.save();
    return res.json(updatedTicket)
  
}catch(err){
  res.send(err);
}
})

module.exports = app =>app.use('/ticket',router)