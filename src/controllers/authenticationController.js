const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



//Registrar Usuario
const register = async(req,res) =>{
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password,10);
    newUser.save(function(err,user){
        if(err){
            return res.status(404).send({message:err})
        }else{
            user.password = undefined;
            return res.json(user);
        }
    })

}

//Login
const login = async(req,res) =>{
    User.findOne({
        email:req.body.email
    }, function(err,user){
        if(err)throw err;
        if(!user||!user.comparePassword(req.body.password)){
            return res.status(401).json({ message: 'Email ou senha Invalido' });
        }
        return res.json({token:jwt.sign({email:user.email, _id: user._id })});

    })
  
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