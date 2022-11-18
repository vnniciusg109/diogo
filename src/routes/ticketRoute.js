const express = require('express')
const router = express.Router()

const {getTicket,getTickets,createTicket,updateTicket,deleteTicket,searchTicket} = require('../controllers/ticketController')



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

//Buscar Ingresso
router.get('/search',searchTicket)


module.exports = router