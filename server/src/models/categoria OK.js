const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
    nomecategoria:
    {
        type:
        String,
        require:true,
        unique:true
    }, 
    valorcategoria:
    {
        type:
        String,
        require:true
    }
})


const novacategoria = mongoose.model('categoria', CategoriaSchema)

module.exports = novacategoria