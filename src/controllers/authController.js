const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
})
}

router.post('/register', async(req,res)=>{
    const { email,cpf,pnumber } = req.body
    
    try{
        if(await User.findOne({email}))
        return res.status(400).send({error:'Usuario ja existe'})
        if(await User.findOne({cpf}))
        return res.status(400).send({error:'Usuario ja existe'})
        if(await User.findOne({pnumber}))
        return res.status(400).send({error:'Usuario ja existe'})


        const user = await User.create(req.body)


        return res.send({user, token: generateToken({ id: user.id })})
    }catch(err){
        return res.status(400).send({error: 'Registration failed'})
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
      return res.status(400).send({error:'Usuário não encontrado'})
     
    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Senha invalida'})
    

      res.send({user, token: generateToken({ id: user.id })})


})

module.exports = app => app.use('/auth', router)


router.get('/list', async(req,res)=> {
  try{
  const users = await User.find({});
  return res.json(users);
 }catch(err){
  res.send(err);
 }
})