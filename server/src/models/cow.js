import db from '../config/database.js';

const fields = [
    'name',
    'status',
    'gender',
    'birth_date',
    'weight',
    'picture',
];

const all = async (filters =  {}) => {
    let query = 'SELECT * FROM cows';
    const params = [];

    const conditions = [];

    Object.entries(filters).map(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            if (key === 'name') {
                params.push(`%${value}%`);
                conditions.push(`${key} LIKE ?`);
                return;
            }

            if(key === 'birth_date') {
                // if format is yyyy-mm
                if (value.match(/^\d{4}-\d{2}$/)) {
                    const [year, month] = value.split('-');
                    const [start, end] = GetFirstAndLastDate(year, month);
                    params.push(start, end);
                    conditions.push(`${key} BETWEEN ? AND ?`);
                    return;
                }

                // if format is daterange yyyy-mm-dd - yyyy-mm-dd
                if(value.match(/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}$/)) {
                    const [start, end] = value.split(' - ');
                    params.push(start, end);
                    conditions.push(`${key} BETWEEN ? AND ?`);
                    return;
                }
                
                // if format is yyyy
                if (value.match(/^\d{4}$/)) {
                    const start = `${value}-01-01`; // Start of the year
                    const end = `${value}-12-31`;  // End of the year
                    params.push(start, end);
                    conditions.push(`${key} BETWEEN ? AND ?`);
                    return;
                }
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