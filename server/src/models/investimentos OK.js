const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newInvestiment =  new Schema({
    iduser:
    {
        type:
            String,
        require: true,
    },
    nomeinvestimento:
    {
        type:
            String,
        required: true
      
    },
    datacompra:
    {
        type:
            String,
        required: true
        
    },
    valorinvestido:
    {
        type:
            Number,
        required: true
       
    },
    vencimentoativo:
    {
        type:
            String,
        required: true
       
    },
    emailuser:
    {
        type:
            String,
        required: true
       
    },
    
    diasParaVencimento:
    {
        type:
            Number,
        required: true
       
    },
    valoratualinvestimento:
    {
        type:
            Number
        
       
    },
    datasemformatação:
    {
        type:
            String,
        required: true
       
    },
    banco:
    {
        type:
            String,
        required: true
       
    },
    tiporenda:
    {
        type:
            String,
        required: true
       
    },
    
})


const newInvestimento = mongoose.model('investimento', newInvestiment)
module.exports = newInvestimento