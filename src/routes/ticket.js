const express = require('express')
const router = express.Router()

const {getTicket,getTickets,createTicket,updateTicket,deleteTicket} = require('../controllers/ticketController')



//Ver todos ingressos
router.get('/',getTickets)

//Filtrar por ID
router.get('/:ticketID',getTicket)

//Criar Ingresso
router.post('/create',createTicket)

//Atualizar Ingresso
router.put('/:ticketID',updateTicket)

//Deletar Ingresso
router.delete('/:ticketID',deleteTicket)


module.exports = router