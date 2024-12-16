import db from '../config/database.js';

const create = async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "INSERT INTO users (" + keys.join(', ') + ") VALUES ( ?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

const findByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const values = [email];

    return db.execute(query, values);
};

const findById = async (id) => {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
}

const updateRefreshToken = async (id, refreshToken) => {
    return db.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, id]);
}

const findByRefreshToken = async (refreshToken) => {
    return db.execute('SELECT * FROM users WHERE refresh_token = ?', [refreshToken]);
}

const deleteRefreshToken = async (refreshToken) => {
    return db.execute('UPDATE users SET refresh_token = NULL WHERE refresh_token = ?', [refreshToken]);
}

export default {
    create,
    findByEmail,
    findById,
    updateRefreshToken,
    findByRefreshToken,
    deleteRefreshToken
}