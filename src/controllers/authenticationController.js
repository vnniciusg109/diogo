const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

function generateToken(params = {}){
    return jwt.sign(params,JWT_SECRET,{
        expiresIn:8000,
    });
}



//Registrar Usuario
const register = async(req,res) =>{
    const{username,lastname,cpf,pnumber,email,password} = req.body;
    try{
        if(await User.findOne({email})){
            return res.status(400).send({error:"Email ja utilizado"})
        }
        if(await User.findOne({cpf})){
            return res.status(400).send({error:"Cpf ja utilizado"})
        }
        if(await User.findOne({pnumber})){
            return res.status(400).send({error:"Numero ja utilizado"})
        }

        const user = await User.create(req.body)
        user.password = undefined;

        return res.send({
            user,
            token:generateToken({id:user.id})
        });
    }catch(err){
        return res.status(400).send({error:"O registro falhou"});
    }

}

//Login
const login = async(req,res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).send({error:"Usuario nao encontrado"});
    }
    if(!await bcrypt.compare(password,user.password)){
        return res.status(400).send({error:"Senha invalida"});
    }

    user.password = undefined;
    res.send({user, token: generateToken({ id: user.id })});

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