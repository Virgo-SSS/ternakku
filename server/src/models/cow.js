import db from '../config/database.js';

const fields = [
    'name',
    'status',
    'gender',
    'birth_date',
    'weight',
    'picture',
];

const all = async () => {
    return db.execute('SELECT * FROM cows');
}

const create = async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = "INSERT INTO cows (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

// Mengambil sapi berdasarkan ID
const findById = async (id) => {
    return db.execute('SELECT * FROM cows WHERE id = ?', [id]); // Query untuk mencari sapi berdasarkan ID
};

const destroy = async (id) => {
    return db.execute('DELETE FROM cows WHERE id = ?', [id]);
}

const update = async(id, data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key));
    const values = keys.map(key => data[key]);

    const query = "UPDATE cows SET " + keys.map(key => `${key} = ?`).join(', ') + " WHERE id = ?";

    return db.execute(query, [...values, id]);
}

export default {
    all,
    create,
    findById,
    destroy,
    update
}