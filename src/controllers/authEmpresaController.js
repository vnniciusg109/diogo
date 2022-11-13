const express = require('express');
const bcrypt = require('bcryptjs');
const Partner = require('../models/partnerModel');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
})
}

router.post('/register', async(req,res)=>{
    const { email,eventCnpj } = req.body
    
    try{
        if(await Partner.findOne({email}))
        return res.status(400).send({error:'Usuario ja existe'})
        if(await Partner.findOne({eventCnpj}))
        return res.status(400).send({error:'Usuario ja existe'})



        const partner = await Partner.create(req.body)


        return res.send({Partner, token: generateToken({ id: partner.id })})
    }catch(err){
        return res.status(400).send({error: 'Registration failed'})
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    const partner = await Partner.findOne({ email }).select('+password')

    if (!user)
      return res.status(400).send({error:'Usuário não encontrado'})
     
    if(!await bcrypt.compare(password, partner.password))
      return res.status(400).send({ error: 'Senha invalida'})
    

      res.send({partner, token: generateToken({ id: partner.id })})


})




router.get('/list', async(req,res)=> {
  try{
  const partners = await Partner.find({});
  return res.json(partners);
 }catch(err){
  res.send(err);
 }
})

module.exports = app => app.use('/authpartner', router)