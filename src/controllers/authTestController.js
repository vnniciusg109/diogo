const config = require('../config/auth');
const User = require('../models/userModel');

var jwt = require('jsonwebtoken');
var bcript = require('bcryptjs');


//register
const createUser = (req,res) =>{
    const user = new User({
        username:req.body.username,
        lastname : req.body.lastname,
        cpf:req.body.cpf,
        pnumber:req.body.pnumber,
        email:req.body.email,
        password:bcript.hashSync(req.body.password,8),
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

    //Se o email exitir
    .then((user) =>{
        //Compara as senhas
        bcrypt
        .compare(req.body.password, user.password)

            //Verifica se as senhas sao iguais
        .then((passwordCheck) =>{
            if(!passwordCheck){
                return response.status(400).send({message : "SENHAS DIFERETES",error});
            }
            //criar token jwt
            const token = jwt.sign({
                userId:user._id,
                userEmail:user.email,
            },"RANDOM-TOKEN",{expiresIn: "24hr"});

            response.status(200).send({message : "Login realizado com sucesso!",email:user.email,token});
            })

            //Se as senhas nao forem iguais
            .catch((error) => {
                response.status(400).send({message : "SENHAS DIFERETES",error});
            });
    })
    .catch((error) =>{
        response.status(404).send({message : "E-mail nao encontraod",error});
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