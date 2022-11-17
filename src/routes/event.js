const express = require('express')
const router = express.Router()

const eventCtrl = require('../controllers/eventController')



//Ver todos eventos
router.get('/all-events',eventCtrl.getEvents)

//Filtrar por ID
router.get('/:eventID',eventCtrl.getEvent)

//Criar Evento
router.post('/create',eventCtrl.createEvent)

//Atualizar Evento
router.put('/:eventID',eventCtrl.updateEvent)

//Deletar Evento
router.delete('/:eventID',eventCtrl.deleteEvent)


module.exports = router