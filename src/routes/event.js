const express = require('express')
const router = express.Router()

const {getEvent,getEvents,createEvent,updateEvent,deleteEvent} = require('../controllers/eventController')



//Ver todos eventos
router.get('/',getEvents)

//Filtrar por ID
router.get('/:eventID',getEvent)

//Criar Evento
router.post('/create',createEvent)

//Atualizar Evento
router.put('/:eventID',updateEvent)

//Deletar Evento
router.delete('/:eventID',deleteEvent)


module.exports = router