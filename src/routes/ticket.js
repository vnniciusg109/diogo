const express = require('express')
const router = express.Router()

const ticketCtrl = require('../controllers/ticketController')



//Ver todos ingressos
router.get('/all-ticktes',ticketCtrl.getTickets)

//Filtrar por ID
router.get('/:ticketID',ticketCtrl.getTicket)

//Criar Ingresso
router.post('/create',ticketCtrl.createTicket)

//Atualizar Ingresso
router.put('/:ticketID',ticketCtrl.updateTicket)

//Deletar Ingresso
router.delete('/:ticketID',ticketCtrl.deleteTicket)


module.exports = router