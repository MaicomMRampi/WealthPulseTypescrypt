const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PatrimonioSchema = new Schema({
    nomepatrimonio:
    {
        type:
            String,
        require: true,
        unique: true
    },
    tipopatrimonio:
    {
        type:
            String,
        require: true
    },
    valorpatrimonio:
    {
        type:
            Number,
        require: true
    },
    dataaquisicao:
    {
        type:
            Date,
        require: true
    },
    userid:
    {
        type:
            String,
        require: true
    }
})

const Patrimonio = mongoose.model('patrimonios', PatrimonioSchema)

module.exports = Patrimonio