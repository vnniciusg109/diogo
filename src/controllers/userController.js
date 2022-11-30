const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse,createTokenUser,checkPermission}  = require('../utils');
const User = require('../models/user');

//Mostrar todos os usuarios com a role user
const gettAllUsers = async(req,res) =>{
    const users = await User.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});
}

//Mostrar todos os usuarios com a role user
const gettAllUsersEvents = async(req,res) =>{
    const users = await User.find({role:'event'}).select('-password');
    res.status(StatusCodes.OK).json({users});
}

//Mostrar um unico usuario
const getSingleUser = async(req,res) =>{
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`Nao existe usuario com o id: ${req.params.id}`)
    }

    checkPermission(req.user,user._id);
    res.status(StatusCodes.OK).json({user});

}

//Atualizar dados do usuario
const updateUser = async(req,res)=>{
    const {email,username} = req.body;
    if(!username||!email){
        throw new CustomError.BadRequestError("Favor inserir um nome e email");
    }

    const user = await User.findOne({_id:req.params.id});
    user.email= email;
    user.username = username;
    await user.save();
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res,user:tokenUser});
    res.status(StatusCodes.OK).json({user:tokenUser});
    
}


//Alterar senha do usuario
const updateUserPassword = async(req,res)=>{
    const{oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Inserir ambas as senhas, tanto quanto a nova quanto a antiga');

    }
    const user = await User.findOne({_id:req.params.id});
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Credenciais invalidas");
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg: "Senha alterada com sucesso"})

}


module.exports ={
    getSingleUser,
    gettAllUsersEvents,
    gettAllUsers,
    updateUser,
    updateUserPassword,
}