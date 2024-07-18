const mongoose = require('mongoose')

const Schema = mongoose.Schema

const  valoreAtuaisShema = new Schema({
    idInvestimento:
    {
        type:
            Object,
        require: true,
    },
    valor:
    {
        type:
            Number,
        
        
    },
    data: {
        type: Date,
        default: Date.now,
    },
    


})

const newValor = mongoose.model('valoresatuais', valoreAtuaisShema)

module.exports = newValor 