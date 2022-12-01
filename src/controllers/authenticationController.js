const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {JWT_SECRET = "jwt_secret"} = process.env



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
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
                const token  = await jwt.sign({email:user.email},JWT_SECRET);
                res.json({token});
            }else{
                res.status(400).json({ error: "As senhas nao sao iguais" });
            }
        }else{
            res.status(400).json({ error: "Usuario nao existe" });
        }
        
    }catch(error){
        res.status(404).json({error});
    }
  
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