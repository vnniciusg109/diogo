const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/authTest');
const {createAccount,loginAccount,logoutAccount} = require('../controllers/authTestController')



//Registrar conta 
router.post('/create-account',createAccount)

//Login
router.post('/login',loginAccount)

//Logout
router.post('logout',Auth,logoutAccount)

