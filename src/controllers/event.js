const Event = require('../models/event');
const express = require('express');

const router = express.Router();

function handleError(res,err){
  return res.send(500,err);
}


//Lista de Eventos

router.get('/list', async(req,res)=> {
  try{
  const events = await Event.find({});
  return res.json(events);
 }catch(err){
  res.send(err);
 }
})

//Criar Evento
router.post('/create', async(req,res) =>{
  try{
    const event = await Event.create(req.body);
    return res.json(event);
  }catch(err){
    res.send(err);
  }
})


module.exports = app => app.use('/event', router)