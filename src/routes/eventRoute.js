const express = require('express')
const router = express.Router()
const {getEvent,getEvents,createEvent,updateEvent,deleteEvent} = require('../controllers/eventController')
const {authenticateUser,authorizePermissions} = require('../middlewares/authentication');
const {getSingleEventTicket} = require('../controllers/ticketController')


router.route('/')
      .post(createEvent)
      .get(getEvents)
      
router.route('/:id')
      .get(getEvent)
      .patch(updateEvent)
      .delete(deleteEvent)

router.route('/:id/tickets')
      .get(getSingleEventTicket)

      

module.exports = router