const mongoose = require('mongoose')

const Schema = mongoose.Schema

const formaPagamentoSchema = new Schema({
    nomeformapagamento:
    {
        type:
        String,
        require:true,
        unique:true
    }, 
    valorformapagamento:
    {
        type:
        String,
        require:true
    }
})


const novaForma = mongoose.model('formadepagamento', formaPagamentoSchema)

module.exports = novaForma