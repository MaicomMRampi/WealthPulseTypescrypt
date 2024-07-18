const mongoose = require('mongoose')

const Schema = mongoose.Schema

const controleContasShema = new Schema({
    idUser:
    {
        type:
            String,
        require: true,
    },

    empresa:
    {
        type:
            String,
        require: true,
    },

    datagasto:
    {
        type:
            String,
        required: true
       
    },


    vencimento:
    {
        type:
            String,
        required: true
       
    },

    parcelamento:
    {
        type:
            Number,
        require: true,
    },


    valorconta:
    {
        type:
            Number,
        required: true
        
    },
    formadepagamento:
    {
        type:
            String,
        required: true,
    },
    pago:
    {
        type:
            Boolean,
            default:false,
        
    },
    mesano:{
        type:String,
        require:true
    },
    emailuser:
    {
        type:
            String,
        required: true
       
    },


})

const newUser = mongoose.model('controledecontas', controleContasShema)

module.exports = newUser 