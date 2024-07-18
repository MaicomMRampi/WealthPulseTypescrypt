const moongoose = require('mongoose')

const Schema = moongoose.Schema

const nomefundosimobiliariosSchema = new Schema({
    nomefundo:
    {
        type:
            String,
        require: true,
    },
    valornomefundo:
    {
        type:
            String,
        require: true
    }
})


const nomefundosimobiliario = moongoose.model('nomefundosimobiliarios', nomefundosimobiliariosSchema)
module.exports = nomefundosimobiliario
