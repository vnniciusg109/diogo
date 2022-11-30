const express = require('express')
const router = express.Router()

const {getTicket,getTickets,createTicket,updateTicket,deleteTicket} = require('../controllers/ticketController')
const{ authenticateUser } = require('../middlewares/authentication');

router.route('/')
            .post(authenticateUser,createTicket)
            .get(getTickets)


router.route('/:id')
            .get(getTicket)
            .patch(authenticateUser,updateTicket)
            .delete(authenticateUser,deleteTicket)


module.exports = router