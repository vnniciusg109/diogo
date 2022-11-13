const Ticket = require('../models/ticketModel');
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

    ticket.tickName  = req.body.tickName;
    ticket.tickPrice = req.body.tickPrice;
    ticket.tickLocal = req.body.tickLocal;
    ticket.tickGender  = req.body.tickGender;
    ticket.tickYear = req.body.tickYear;
    ticket.tickType = req.body.tickType;

    const updatedTicket = await ticket.save();
    return res.json(updatedTicket)
  
}catch(err){
  res.send(err);
}
})

module.exports = app =>app.use('/ticket',router)