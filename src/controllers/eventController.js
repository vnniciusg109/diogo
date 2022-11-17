const events = require('../models/eventModel')

const getEvents = ((req, res) => {
    res.json(events)
})

const getEvent = ((req, res) => {
    const id = Number(req.params.eventID)
    const event = events.find(event => event.id === id)

        if (!event) {
        return res.status(404).send('event not found')
    }
    res.json(event)
})

const createEvent = ((req, res) => {
    const newEvent = {
        id: events.length + 1,
        eventname: req.body.eventname,
        eventday: req.body.eventday,
        description : req.body.description,
        type : req.body.type,
        location : req.body.location,

    }
    events.push(newEvent)
    res.status(201).json(newEvent)
})

const updateEvent = ((req, res) => {
    const id = Number(req.params.eventID)
    const index = events.findIndex(event => event.id === id)
    const updatedEvent = {
        id: events[index].id,
        eventname: req.body.eventname,
        eventday: req.body.eventday,
        description : req.body.description,
        type : req.body.type,
        location : req.body.location,
        
    }

    events[index] = updatedEvent
    res.status(200).json('event updated')
})

const deleteEvent = ((req, res) => {
    const id = Number(req.params.eventID)
    const index = events.findIndex(event => event.id === id)
    events.splice(index,1)
    res.status(200).json('event deleted')
})

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}