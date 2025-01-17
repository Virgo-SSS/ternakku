import db from '../config/database.js';

const fields = [
    'user_id',
    'name',
    'gender',
    'phone_number',
    'email',
    'status'
];

const all = async (filters = {}) => {
    let query = 'SELECT * FROM workers';
    const params = [];

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

    const query = "INSERT INTO workers (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

const findById = async (id, user_id) => {
    const [rows, fields]  = await db.execute('SELECT * FROM workers WHERE id = ? AND user_id = ?', [id, user_id]);
    
    if (!rows.length) {
        throw new Error('Worker not found');
    }

    return rows[0];
}

const update = async(id, user_id, data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key) && data[key] !== undefined);
    const values = keys.map(key => data[key]);

    const query = "UPDATE workers SET " + keys.map(key => key + ' = ?').join(', ') +  " WHERE id = ? AND user_id = ?";

    return db.execute(query, [...values, id, user_id]);
}

const destroy = async (id, user_id) => {
    return db.execute('DELETE FROM workers WHERE id = ? AND user_id = ?', [id, user_id]);
}

export default {
    all,
    create,
    findById,
    destroy,
    update
}