require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const prisma = require('./src/utils/dbConnect');
const path = require('path');

app.use(express.json());
app.use(cors({
    origin: '*',
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://app.fluxodocapital.com.br'); // Defina a origem permitida
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos HTTP permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permitir envio de cookies

    // Se for uma requisição OPTIONS (preflight), responde com status 200
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);
const port = process.env.PORT || 3306; // Escolher uma porta apropriada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


