const {Router} = require('express');
const {add_cart_ticket,delete_ticket,get_cart_tickets} = require('../controllers/cartController');
const router = Router();


//Mostrar carrinho
router.get('',get_cart_tickets)

//Adicionar ticket ao carrinho
router.post('',add_cart_ticket)

//Deletar um ticket do carrinho
router.delete('',delete_ticket)

module.exports = router;