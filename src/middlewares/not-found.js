const notFound =  (req,res) => res.status(404).send('Este caminho nao existe!!');
module.exports = notFound;