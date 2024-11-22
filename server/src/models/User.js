import db from '../config/database.js';

const addUser = async (data) => {
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

export default {
    addUser,
    findByEmail
}