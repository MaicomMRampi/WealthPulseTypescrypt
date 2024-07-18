const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newPatrimonioGastos = new Schema({
    idpatrimonio: {
        type: String,
    },
    observacao: {
        type: String,
    },
    nomepatrimonio: {
        type: String,
    },
    kmantigo: {
        type: Number,
    },
    kmatual: {
        type: Number,
    },
    tipodespesa: {
        type: String,
    },
    nomedespesa: {
        type: String,
    },
    tipopatrimonio: {
        type: String,
    },
    valor: {
        type: Number,
    },
    responsavel: {
        type: String,
    },
    dataaquisicao: {
        type: String,
    },
    compradorpagador: {
        type: String,
    },
    iduser: {
        type: String,
    },

})

const DespesaDeBens = mongoose.model('despesadebens', newPatrimonioGastos)

module.exports = DespesaDeBens