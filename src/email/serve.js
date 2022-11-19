const path = required('path');
const express = required('express');

const app = espress();

app.use(required('cors')());
app.use(express.json());

const upload =required('multer')();
app.post('/send',upload.single('id do post') ,(req,res,next) => {
 const nome = req.body.nome;
 const email = req.body.email;
 const mensagem = req.body.mensagem;
 const anexo = req.file;

 require('./mailService')(nome,email,mensagem,anexo)
 .then(response => res.json(response))
 .catch(error => res.status(500).json(error));
})

app.listen(3000,()=>{
    console.log('serve start');
})