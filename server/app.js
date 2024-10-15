require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const prisma = require('./src/utils/dbConnect');
const path = require('path');

// Middleware para JSON
app.use(express.json());

// Configuração de CORS
app.use(cors({
    origin: 'https://app.fluxodocapital.com.br',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Content-Type', 'X-Custom-Header']
}));

// Adicionando manualmente o header 'Access-Control-Allow-Origin'
// Exemplo usando Express.js
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // ou especificar o domínio
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Middleware para servir arquivos estáticos (como uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definindo rotas
app.use('/', routes);

// Corrigindo a porta para 3000 (ou uma diferente de 3306)
const port = process.env.PORT || 3306; // Alterando a porta
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);
});
