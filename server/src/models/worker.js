import db from '../config/database.js';

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
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "INSERT INTO workers (" + keys.join(', ') + ") VALUES ( ?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

const findById = async (id) => {
    const [rows, fields]  = await db.execute('SELECT * FROM workers WHERE id = ?', [id]);
    
    if (!rows.length) {
        throw new Error('Worker not found');
    }

    return rows[0];
}

const destroy = async (id) => {
    return db.execute('DELETE FROM workers WHERE id = ?', [id]);
}

const update = async(id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "UPDATE workers SET " + keys.map(key => `${key} = ?`).join(', ') + " WHERE id = ?";

    return db.execute(query, [...values, id]);
}

export default {
    all,
    create,
    findById,
    destroy,
    update
}