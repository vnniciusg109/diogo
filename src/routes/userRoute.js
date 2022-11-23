const express = require('express')
const router = express.Router()
const {createUser,Login,Logout} = require('../controllers/authTestController')



//Registrar conta 
router.post('/create-account',createUser)

//Login
router.post('/login',Login)

//Logout
router.post('/logout',Logout)

//List
//router.get('/list',List)

module.exports = router;