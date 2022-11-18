const express = require('express');
const authMiddleware = require('../middlewares/tokenChecker');
const router = express.Router();

router.use(authMiddleware);

router.get('/', (req,res) => {
    res.send({ ok:true})
})

module.exports = app => app.use('/projects', router)