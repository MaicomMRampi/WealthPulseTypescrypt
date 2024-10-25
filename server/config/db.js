const mysql = require('mysql2');

// Carregar as variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config();

// Criar conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Teste de conexão
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL com sucesso.');
});

module.exports = db;
