const userModel = require('../models/userModel');

exports.getAllUsers = async () => {
    const [rows] = await userModel.getAll();
    return rows;
};

exports.createUser = async (data) => {
    return await userModel.create(data);
};
