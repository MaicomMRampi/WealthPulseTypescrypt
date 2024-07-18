const mongoose = require('mongoose')


const Schema = mongoose.Schema

const AnotacaoSchema = new Schema({
    anotacao: {
        type: String,
        require: true
    }
})

const novaAnotacao = mongoose.model('anotacoes', AnotacaoSchema)

module.exports = novaAnotacao