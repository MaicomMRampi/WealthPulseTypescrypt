const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    nome:
    {
        type:
            String,
        require: true,
    },
    cpf:
    {
        type:
            String,
        required: true,
        unique: true
    },
    email:
    {
        type:
            String,
        required: true,
        unique: true

    },
    senha:
    {
        type:
            String,
        required: true,

    },
    datacadastro:
    {
        type: Date,
        default: Date.now
    }

})

const newUser = mongoose.model('usuarios', usersSchema)

module.exports = newUser 