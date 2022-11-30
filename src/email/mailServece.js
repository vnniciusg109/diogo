const mailer = require('nodemailer');
module.exports = (email,nome,mensagem,anexo) => {
    const smtp = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user: "jsteste93@gmail.com",
            pass:  "mpvs140403"
        }
    })
    const mail = {
        from: "jsteste93@gmail.com",
        to: email,
        subject: 'enviado por ${nome}',
        text: mensagem
    }
}

if(anexo){
    mail.attachments = [];
    mail.attachments.push({
        filename:anexo.originalname,
        content: anexo.buffer
    })
}

return new Promise((resolve,reject)=>{
    smtp.sendMail(mail)
    .then(response => {
        smtp.close();
        return resolve(response);
    })
    .catch(error => {
        smtp.close();
        return rejact(error);
    })
})
