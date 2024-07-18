const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BancoSchema = new Schema({
    nomebanco:
    {
        type:
        String,
        require:true,
        unique:true
    }, 
    valorbanco:
    {
        type:
        String,
        require:true
    }
})


const novoBanco = mongoose.model('banco', BancoSchema)

module.exports = novoBanco