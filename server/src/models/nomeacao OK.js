const moongoose = require('mongoose')

const Schema = moongoose.Schema

const nomeacaoSchema = new Schema({
    nomeacao:
    {
        type:
            String,
        require: true,
    },
    valornomeacao:
    {
        type:
            String,
        require: true
    },
    iduser: {
        type: String,
        require: true
    }
})


const nomeacaobanco = moongoose.model('nomeacao', nomeacaoSchema)
module.exports = nomeacaobanco
