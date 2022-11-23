const User = require("../models/userTest");

//Criar Conta
const createAccount = async(req,res) =>{
    const user = User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status (201).send({user,token})
    }catch(error){
        res.status(400).send(error)
    }
}

//Login
const loginAccount = async(req,res) =>{
    try{
        const user= await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(error){
        res.status(400).send(error)
    }
}

//Logout
const logoutAccount = async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
}



module.exports = {
    createAccount,
    loginAccount,
    logoutAccount,
    
}