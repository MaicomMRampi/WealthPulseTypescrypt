const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./src/routes/userRoutes')

// Configurando dotenv
dotenv.config();

const app = express();

// Configurando o CORS
app.use(cors());

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());
app.use(userRoutes)


app.get('/api', (req, res) => {
    res.send('Olá, mundo!, acessou caraio');
});

// Iniciando o servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app