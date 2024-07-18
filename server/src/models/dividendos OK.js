const moongoose = require('mongoose')
const Schema = moongoose.Schema

const dividendosSchema = new Schema({
    datainserido: {
        type: Date,
        require: true,
        default: Date.now
    },
    valordividendo: {
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

const dividendos = moongoose.model('dividendos', dividendosSchema)
module.exports = dividendos