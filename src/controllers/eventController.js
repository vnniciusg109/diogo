const Event = require('../models/eventModel')


//Listar todos os Eventos
const getEvents = ((req, res) => {
    Event.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

//Buscar um Evento em especifico
const getEvent = ((req, res) => {
    Event.findOne({ _id: req.params.eventID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Event not found'}))
})

//Criar Evento
const createEvent = ((req,res) => {
    Event.create(req.body)
         .then(result => res.status(200).json({ result }))
         .catch((error) => res.status(400).json({msg: 'Erro' }))

})
  

//Atualizar dados de um E vento
const updateEvent = ((req, res) => {
    Event.findOneAndUpdate({ _id: req.params.eventID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Event not found' }))
})

//Deletar um Evento
const deleteEvent = ((req, res) => {
    Event.findOneAndDelete({ _id: req.params.eventID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Event not found' }))
})

//Buscar Ticket
//const searchEvent = ((req, res) => {
    //Event.findOne({ evName: req.params.evNameID })
        //.then(result => res.status(200).json({ result }))
        //.catch(() => res.status(404).json({msg: 'Event not found'}))
//})

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,

}