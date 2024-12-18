import db from '../config/database.js';

const fields = [
    'name',
    'email',
    'password',
    'refresh_token'
]

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

const update = async (id, data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key) && data[key] !== undefined);
    const values = keys.map(key => data[key]);

    const query = "UPDATE users SET " + keys.join(' = ?, ') + ' = ? WHERE id = ?';
    return db.execute(query, [...values, id]);
}

const updatePassword = async (id, password) => {
    return db.execute('UPDATE users SET password = ? WHERE id = ?', [password, id]);
}

export default {
    create,
    update,
    findByEmail,
    findById,
    updateRefreshToken,
    findByRefreshToken,
    deleteRefreshToken,
    updatePassword
}