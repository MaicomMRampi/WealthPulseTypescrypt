const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'seuSegredoSuperSecreto', (erro, decodificado) => {
        if (erro) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.usuario = decodificado;
        next();
    });
};

module.exports = verificarToken;
