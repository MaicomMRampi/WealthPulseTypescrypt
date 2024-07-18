const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newInvestiment = new Schema({
    iduser:
    {
        type:
            String,
        require: true,
    },
    nomefii:
    {
        type:
            String,
        required: true

    },
    datacompra:
    {
        type:
            String,
        required: true

    },
    valorpago:
    {
        type:
            Number,
        required: true

    },

    quantidade:
    {
        type:
            Number,
        required: true

    },
    valoratualfii:
    {
        type:
            Number


    },
    valorgasto:
    {
        type:
            Number


    },
    emailuser:
    {
        type:
            String,
        required: true

    },
    idnomefundo: {
        type: String
    }
})


const newInvestimento = mongoose.model('investimentofundo', newInvestiment)
module.exports = newInvestimento