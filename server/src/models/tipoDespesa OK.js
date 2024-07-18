const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newTipoDespesa = new Schema({
    nomedespesa: {
        type: String,
        require: true
    },
    iduser: {
        type: String,
        require: true
    },
    valordespesa: {
        type: String,
        require: true
    },
})

const TipoDespesa = mongoose.model('tipodespesa', newTipoDespesa)
module.exports = TipoDespesa