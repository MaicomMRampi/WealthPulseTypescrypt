require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const prisma = require('./src/utils/dbConnect');
const path = require('path');

app.use(express.json());
app.use(cors({
    accessControlAllowOrigin: '*',
    origin: 'https://app.fluxodocapital.com.br', // Permitir apenas essa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Se você precisar enviar cookies
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);
const port = 3306;
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);
});


