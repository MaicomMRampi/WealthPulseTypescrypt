require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const prisma = require('./src/utils/dbConnect');
const path = require('path');

app.use(express.json());

app.use(cors({
    origin: 'https://app.fluxodocapital.com.br'
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);
const port = process.env.PORT || 3306; // Escolher uma porta apropriada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


