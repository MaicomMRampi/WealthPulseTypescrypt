require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const prisma = require('./src/utils/dbConnect');
const path = require('path');

app.use(express.json());
app.use(cors({
    origin: 'https://app.fluxodocapital.com.br', // Domínio permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Habilitar cookies
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);
const port = 3306;
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);
});


