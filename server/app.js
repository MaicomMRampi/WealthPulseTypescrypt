const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./src/routes');
const app = express();

// Configuração de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.options('*', cors());  // Lidar com requisições OPTIONS

// Middlewares para parsing e uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Rotas
app.use('/', routes);

// Iniciar servidor
const port = process.env.PORT || 3306;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))