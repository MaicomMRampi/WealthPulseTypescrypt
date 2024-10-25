const db = require('../config/db');

exports.getAll = () => {
    return db.query('SELECT * FROM users');
};

exports.create = ({ nome, email }) => {
    return db.query('INSERT INTO users (nome, email) VALUES (?, ?)', [nome, email]);
};
