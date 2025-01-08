import db from '../config/database.js';

const fields = [
    'user_id',
    'name'
];

const all = async (filters = {}) => {
    let query = `SELECT * FROM transaction_categories`;
    const params = [];

    // Add filtering conditions dynamically
    const conditions = []; 
    
    Object.entries(filters).map(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            if (key === 'name') {
                params.push(`%${value}%`);
                conditions.push(`${key} LIKE ?`);
                return;
            }

            params.push(value);
            conditions.push(`${key} = ?`);
            return;
        }
    });

    if (conditions.length) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    return db.execute(query, params);
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