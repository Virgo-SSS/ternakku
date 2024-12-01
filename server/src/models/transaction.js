import db from '../config/database.js';

const fields = [
    'id',
    'name',
    'date',
    'category',
    'amount',
    'type',
    'notes'
];

const create = async (data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key) && data[key] !== undefined);
    const values = keys.map(key => data[key]);

    const query = "INSERT INTO transactions (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

export default {
    create
}