const Cart = require('../models/cartModel');
const Ticket = require('../models/ticketModel');


//Vizualizar Carrinho
const GetCart = async(req,res) => {
    const owner = req.user._id

    try{
        const cart = await Cart.findOne({owner});
        if(cart && cart.tickets.lenght > 0){
            res.status(200).send(cart);
        }else{
            res.send(null);
        }
    }catch(error){
        res.status(500).send();
    }
}

//Criar carrinho de compras
const CreateCart = async(req,res) => {
    const owner = req.user._id

    try{
        const cart = await Cart.findOne({owner});
        const ticket = await Ticket.findOne({_id:ticketId})

        if(!ticket){
            res.status(404).send({message:"Ticket not found"});
            return;
        }

        const price = ticket.tickPrice;
        const name = ticket.tickName;

        if(cart){
            const ticketIndex = cart.tickets.findIndex((ticket) => ticket.ticketId == ticketId);     
        
            if(ticketIndex > -1){
                let product = cart.tickets[ticketIndex];
                product.quantity += quantity;
                cart.bill =cart.tickets.reduce((acc,curr) =>{
                    return acc + curr.quantity * curr.price;
                },0)

                cart.tickets[ticketIndex] = product;
                await cart.save();
                res.status(200).send(cart);

            }else{
                cart.tickets.push({ticketId , name, quantity,price});
                cart.bill = cart.tickets.reduce((acc,curr) => {
                    return acc + curr.quantity * curr.price;},0)
            }
            await cart.save();
            res.status(200).send(cart);
        }else{
            const newCart = await Cart.create({
                owner,
                tickets : [{ticketId,name,quantity,price}],
                bill:quantity * price
            });
            return res.status(201).send(newCart);
        }       
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

//Deletar ticket do carrinho

const delCart = async(req,res) =>{
    const owner = req.user._id;
    const ticketId = req.query.ticketId;

    try{
        let cart = await Cart.findOne({owner});

        const ticketIndex = cart.tickets.findIndex((ticket) => ticket.ticketId == ticketId);

        if(ticketIndex > - 1){
            let ticket = cart.tickets[ticketIndex];
            cart.bill -= ticket.quantity * ticket.price;

            if(cart.bill < 0){
                cart.bill = 0
            }
            
            cart.tickets.splice(ticketIndex,1);
            cart.bill = cart.tickets.reduce((acc,curr) => {
                return acc + curr.quantity * curr.price;
            },0)

            cart = await cart.save();

            res.status(200).send(cart);
        }else{
            res.status(404).send("Ticket not found")
        }

    }catch(error){
        console.log(error);
        res.status(400).sned();
    }
};

module.exports = {
    GetCart,
    CreateCart,
    delCart,
    
}