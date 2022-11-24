const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { authSchema } = require('../helpers/validation_schema')
const createError = require('http-errors')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper')
const router = express.Router();

router.post('/register', async(req,res,next)=>{
  try {
    // const { email, password } = req.body
    // if (!email || !password) throw createError.BadRequest()
    const result = await authSchema.validateAsync(req.body)

    const doesExist = await User.findOne({ email: result.email })
    if (doesExist)
      throw createError.Conflict(`${result.email} já existe`)
    const doesExist1 = await User.findOne({ cpf: result.cpf })
    if (doesExist1)
      throw createError.Conflict(`${result.cpf} já existe`)
    const doesExist2 = await User.findOne({ pnumber: result.pnumber })
    if (doesExist2)
      throw createError.Conflict(`${result.pnumber} já existe`)
    const user = await User.create(req.body)
    const accessToken = await signAccessToken({ id: user.id })
    const refreshToken = await signRefreshToken({ id: user.id })

    res.send({ accessToken, refreshToken })
  } catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}),


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

router.post('/refreshtoken', async(req,res,next)=> {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw createError.BadRequest()
    const userId = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(userId)
    const refToken = await signRefreshToken(userId)
    res.send({ accessToken: accessToken, refreshToken: refToken })
  } catch (error) {
    next(error)
  }
},

router.get('/list', async(req,res)=> {
  try{
  const users = await User.find({});
  return res.json(users);
 }catch(err){
  res.send(err);
 }
}))