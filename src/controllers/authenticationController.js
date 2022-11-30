const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse,createTokenUser} = require('../utils');


//Registrar Usuario
const register = async(req,res) =>{
    const{username,lastname,cpf,pnumber,email,password} = req.body;

    if(await User.findOne({email}))
    return res.status(400).send({error:'Usuario ja existe'})
    if(await User.findOne({cpf}))
    return res.status(400).send({error:'Usuario ja existe'})
    if(await User.findOne({pnumber}))
    return res.status(400).send({error:'Usuario ja existe'})


    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'user':'event';
    const user = await User.create({username,lastname,cpf,pnumber,email,password,role});
    const userToken = createTokenUser(user);
    attachCookiesToResponse({res,user:userToken});
    res.status(StatusCodes.CREATED).json({user})

}

//Login
const login = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError('Insira um e-mail e uma senha!');
    }
    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.NotFoundError('Nao foi encontrado um usuario com esse email!');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Credenciais Invalidas!');
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res,user:tokenUser});
    res.status(StatusCodes.OK).json({user});

}

//Logout
const logout = async(req,res) =>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now() + 1000)
    });
    res.status(StatusCodes.OK).json({msg:"Usuario criado com sucesso!"})
}

module.exports = {
    login,
    logout,
    register
}