const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

exports.createUser = async (req, res) => {
    const { nome, email } = req.body;
    try {
        await userService.createUser({ nome, email });
        res.status(200).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.log("🚀 ~ exports.createUser= ~ error", error)
        res.status(500).json({ message: 'Erro ao criar usuário', messagebanco: error });
    }
};
