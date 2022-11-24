const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const router = express.Router();

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

        const token = jwt.sign(user, authConfig.secret, { expiresIn: 900})
        const refreshToken = jwt.sign(user, authConfig.refreshTokenSecret, { expiresIn: 86400})
        const response = {
          "status": "Logged in",
          "token": token,
          "refreshToken": refreshToken,
      }
        tokenList[refreshToken] = response
        return res.status(200).json(response)
    }catch(err){
        return res.status(400).send({error: 'Registration failed'})
    }
})

router.use(require('../middlewares/tokenChecker'))

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



router.delete('delete', async(req,res)=>{
  const user = await User.deleteOne({_id: req.params.id})
})