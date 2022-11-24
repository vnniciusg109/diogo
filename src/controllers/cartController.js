const Cart = require('../models/cartModel');
const Ticket = require('../models/ticketModel');


//Vizualizar carrinho
module.exports.get_cart_tickets = async(req,res) =>{
    const userId = req.params.id;
    try{
        let cart = await  Cart.findOne({userId});
        if(cart && cart.tickets.lenght>0){
            res.send(cart);            
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Algo deu errado");
    }
}

//Adcionar tickets ao carrinho
module.exports.add_cart_ticket = async(req,res) =>{
    const userId = req.params.id;
    const {ticketId,quantity} = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let ticket = await Ticket.findOne({_id:ticketId});

        if(!ticket){
            res.status(404).seend("Ticket nao encontrado")
        }

        const price = ticket.tickPrice;
        const name = ticket.tickName;

        if(cart){

            //Verifica se o carrinho existe para o usuario
            let ticketIndex = cart.tickets.findIndex(
                t => t.ticketId == ticketId
            )

            //Verifica se o produto existe ou nao
            if(ticketIndex > 1 )
            {
                let ticketTes = cart.tickets[ticketIndex];
                ticketTes.quantity += quantity;
                cart.tickets[ticketIndex] = ticketTes;
            }

            else{
                cart.tickets.push({ticketId,name,price,quantity})
            }

            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{

            const newCart = await Cart.create({
                userId,
                tickets:[{ticketId,name,quantity,price}],
                bill: quantity*price
            });
            return res.status(201).send(newCart);
        }
    }

    catch(err){
        console.log(err);
        res.status(500).send("Algo deu errado!");
    }
}

//Deletar um ticket do carrinho
module.exports.delete_ticket = async(req,res) =>{
    const userId = req.params.userId;
    const ticketId = req.params.ticketId;

    try{
        let cart = await Cart.findOne({userId});
        let ticketIndex = cart.tickets.findIndex(t => t.ticketId == ticketId);
        if(ticketIndex > 1 )
        {
            let ticketTes = cart.tickets[ticketIndex];
            cart.bill -= ticketTes.quantity * ticketId.price;
            cart.tickets.splice(ticketIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Algo deu errado!");
    }

}