const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const bcrypt = require('bcryptjs');

const {attachCookiesToResponse,createTokenUser} = require('../utils');


//Registrar Usuario
const register = async(req,res) =>{
    const{username,lastname,cpf,pnumber,email,password} = req.body;

    const emailExist = await User.findOne({email});
    if (emailExist) {
        throw new CustomError.BadRequestError('Email ja utilizado');
    }
    const cpfExist = await User.findOne({cpf});
    if (cpfExist) {
        throw new CustomError.BadRequestError('Cpf ja utilizado');
    }
    const pnumberExist = await User.findOne({pnumber});
    if (pnumberExist) {
        throw new CustomError.BadRequestError('Numero ja utilizado');
    }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'user':'event';
    const user = await User.create({username,lastname,cpf,pnumber,email,password,role});
    const userToken = createTokenUser(user);
    attachCookiesToResponse({res,user:userToken});
    res.status(StatusCodes.CREATED).json({user})

}

//Login
const login = async(req,res) =>{
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user)
      return res.status(400).send({error:'Usuário não encontrado'})
     
    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Senha invalida'})
    

      res.send({user, token: createTokenUser({ id: user.id })})
}

//Logout
const logout = async(req,res) =>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now() + 1000)
    });
    res.status(StatusCodes.OK).json({msg:"Usuario deslogado com sucesso!"})
}

module.exports = {
    login,
    logout,
    register
}