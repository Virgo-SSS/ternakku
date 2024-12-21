import db from '../config/database.js';

const create = async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "INSERT INTO user_profiles (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

const findByUserId = async (userId) => {
    return db.execute('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);
}

const update = async(userId, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "UPDATE user_profiles SET " + keys.join(' = ?, ') + ' = ? WHERE user_id = ?';
    return db.execute(query, [...values, userId]);
}

export default {
    create,
    findByUserId,
    update
}