const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newControleGastos = new Schema({
    idUser:
    {
        type:
            String,
        require: true,
    },
    datagasto:
    {
        type:
            String,
        required: true

    },
    mesano:
    {
        type:
            String,
        required: true

    },
    local:
    {
        type:
            String,


    },
    formadepagamento:
    {
        type:
            String,
        required: true

    },
    valorgasto:
    {
        type:
            Number,
        required: true

    },
    responsavel:
    {
        type:
            String,
        required: true

    },
    categoria:
    {
        type:
            String,
        required: true

    },
    pagante:
    {
        type:
            String,
        required: true

    },
    emailuser:
    {
        type:
            String,
        required: true

    },
    fechada:
    {
        type:
            Number,
        default: 0

    },
    observacao:
    {
        type:
            String,


    },

})


const newControleGasto = mongoose.model('despesas', newControleGastos)
module.exports = newControleGasto