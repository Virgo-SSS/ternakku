import db from '../config/database.js';

const fields = [
    'id',
    'name'
];

const all = async () => {
    return db.execute("SELECT * FROM transaction_categories");
}

const create = async (data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key));
    const values = keys.map(key => data[key]);

    const query = "INSERT INTO transaction_categories (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

export default {
    all,
    create
}