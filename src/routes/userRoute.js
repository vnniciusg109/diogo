const express = require('express')
const router = express.Router()
const {createUser,Login,Logout} = require('../controllers/authTestController')
const passport = require('passport');
const LocalStrategy  = require ('passport-local')
const passportLocalMoongose=  require('passport-local-mongoose')
const User = require('../models/userModel')
app = express();

//SESSÃO
app.use(require('express-session')({
    secret:"test-session",
    resave : false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Verificar se esta logado

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}



//Registrar conta 
router.post('/create-account',createUser)

//Login
router.post('/login',passport.authenticate("local"),Login)

//Logout
router.post('/logout',Logout)

//List
//router.get('/list',List)

module.exports = router;