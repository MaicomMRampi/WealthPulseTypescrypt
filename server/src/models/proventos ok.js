const moongoose = require('mongoose')
const Schema = moongoose.Schema

const proventosSchema = new Schema({
    datainserido: {
        type: Date,
        require: true,
        default: Date.now
    },
    valorprovento: {
        type: Number,
        require: true
    },
    idinvestimento: {
        type: String,
        require: true
    },
    nomeinvestimento: {
        type: String,
        require: true
    },
    iduser: {
        type: String,
        require: true
    },
    idnomeinvestimento: {
        type: String,
        require: true
    }

})

const proventos = moongoose.model('proventos', proventosSchema)
module.exports = proventos