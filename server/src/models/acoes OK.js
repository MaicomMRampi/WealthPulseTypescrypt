const mongoose = require('mongoose')


const Schema = mongoose.Schema

const AçãoSchema = new Schema({
    nomeinvestimento:
    {
        type:
            String,
        require: true,
    },
    valorinvestido:
    {
        type:
            Number,
        require: true
    },
    banco:
    {
        type:
            String,
        require: true
    },
    tiporenda:
    {
        type:
            String,
        require: true
    },
    datacompra:
    {
        type:
            String,
        require: true
    },
    iduser: {
        type: String,
        require: true
    },
    emailuser: {
        type: String,
        require: true
    }
})


const novaAcao = mongoose.model('acoes', AçãoSchema)

module.exports = novaAcao