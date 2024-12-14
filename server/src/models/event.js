import db from '../config/database.js';

const fields = [
    'title',
    'start_date',
    'end_date',
    'details',
];

const all = async () => {
    const query = `SELECT * FROM events`;

    return db.execute(query);
}

const create = async (data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key));
    const values = keys.map(key => data[key]);

    const query = `INSERT INTO events (${keys.join()}) VALUES (${keys.map(() => '?').join()})`;

    return db.execute(query, values);
}

const update = async (data, id) => {
    const keys = Object.keys(data).filter(key => fields.includes(key));
    const values = keys.map(key => data[key]);

    const query = `UPDATE events SET ${keys.map((key, index) => `${key} = ?`).join()} WHERE id = ?`;

    return db.execute(query, [...values, id]);
}

const destroy = async (id) => {
    const query = `DELETE FROM events WHERE id = ?`;

    return db.execute(query, [id]);
}

export default {
    all,
    create,
    update,
    destroy
};