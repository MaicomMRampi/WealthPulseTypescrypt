require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const prisma = require('./src/utils/dbConnect');
const path = require('path');

app.use(express.json());

app.use(cors({
    origin: 'https://app.fluxodocapital.com.br/pages/register'
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://*.fluxodocapital.com.br');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});
app.use('/', routes);
const port = process.env.PORT || 3306; // Escolher uma porta apropriada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


