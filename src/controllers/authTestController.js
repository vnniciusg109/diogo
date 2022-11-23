const config = require('../config/auth');
const User = require('../models/userModel');

var jwt = require('jsonwebtoken');
var bycript = require('bcryptjs');

//register
const createUser = (req,res) =>{
    const user = new User({
        username:req.body.username,
        lastname : req.body.lastname,
        cpf:req.body.cpf,
        pnumber:req.body.pnumber,
        email:req.body.email,
        password:bycript.hashSync(req.body,password,8),
    });
    user.save((err,user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
    })
}

//login
const Login = (req,res) =>{
    User.findOne({email:req.body.email})
    .exec((err,user) =>{
        if(err){
            res.status(500).send({message:err})
            return;
        }

        if(!user){
            return res.status(404).send({message: "Nenhum usuario encontrado!"});
        }

        var passwordIsValid = bycript.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({message:"Senha incorreta!"});
        }

        var token = jwt.sign({id:user.id},config.secret,{
            expiresIn:86400
        });

        req.session.token = token;
        res.status(200).send({
            id: user._id,
            username:user.username,
            email : user.email,
        })
    })

}
    
//logout
const Logout = (req,res) =>{
    try{
        req.session = null
        return res.status(200).send({message:"Saiu!"})
    }catch(err){
        this.next(err);
    }
}


module.exports={
    createUser,
    Login,
    Logout
}