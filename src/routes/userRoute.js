const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/authTest');
const {createAccount,loginAccount,logoutAccount,List} = require('../controllers/authTestController')



//Registrar conta 
router.post('/create-account',createAccount)

//Login
router.post('/login',loginAccount)

//Logout
router.post('/logout',Auth,logoutAccount)

//List
router.get('/list',List)

module.exports = router;