const express = require('express')
const router = express.Router()
const {getEvent,getEvents,createEvent,updateEvent,deleteEvent, searchEvent} = require('../controllers/eventController')
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb( new Error('Selecione um formato de imagem valido'))
    }
    cb(undefined, true)
    }
})




//Ver todos eventos
router.get('/',getEvents)

//Filtrar por ID
router.get('/:eventID',getEvent)

//Criar Evento
router.post('/create',upload.single('upload'),createEvent)

//Atualizar Evento
router.put('/:eventID',updateEvent)

//Deletar Evento
router.delete('/:eventID',deleteEvent)

//Buscar Evento
router.get('/search/:evNameiID',searchEvent)

module.exports = router