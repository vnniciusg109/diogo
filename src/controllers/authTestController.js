const config = require('../config/auth');
const User = require('../models/userModel');

var jwt = require('jsonwebtoken');
var bcript = require('bcryptjs');


//register
const createUser = (req,res) =>{
    bcript
        .hash(req.body.password,10)
        .then((hashedPassword) => {

            const user = new User({
                username:req.body.username,
                lastname : req.body.lastname,
                cpf:req.body.cpf,
                pnumber:req.body.pnumber,
                email:req.body.email,
                password:hashedPassword,
            });

            user.save()

                .then((result) => {
                    res.status(201).send({message : "Usuario criado com sucesso",result})
                })
                .catch((error) => {
                    res.status(500).send({message : "Erro ao criar o usuario",error})
                })
        })

        .catch((e) =>{
            res.status(500).send({message : "Falha ao mascarar senha",e})
        })
}

//login
const Login = (req,res) =>{

    User.findOne({email:req.body.email})

    //Se o email exitir
    .then((user) =>{

        //Compara as senhas
        bcript
            .compare(req.body.password, user.password)

            //Verifica se as senhas sao iguais
            .then((passwordCheck) =>{
                if(!passwordCheck){
                    return res.status(400).send({message : "SENHAS DIFERETES",error});
                }
            //criar token jwt
            const token = jwt.sign({
                userId:user._id,
                userEmail:user.email,
            },"RANDOM-TOKEN",{expiresIn: "24hr"});

            res.status(200).send({message : "Login realizado com sucesso!",email:user.email,token});
            })

            //Se as senhas nao forem iguais
            .catch((error) => {
                res.status(400).send({message : "SENHAS DIFERETES",error});
            });
    })

    //Se o e-mail nao existir
    .catch((e) => {
        res.status(404).send({message: "Email not found",e,});
      });

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