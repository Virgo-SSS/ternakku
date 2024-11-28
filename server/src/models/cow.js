import db from '../config/database.js';

const all = async () => {
    return db.execute('SELECT * FROM cows');
}

const create = async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "INSERT INTO cows (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

export default {
    all,
    create
}