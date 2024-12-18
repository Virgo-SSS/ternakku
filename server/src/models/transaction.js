import db from '../config/database.js';
import { GetFirstAndLastDate } from '../utils/utils.js';

const fields = [
    'id',
    'name',
    'date',
    'category',
    'amount',
    'type',
    'notes'
];

const all = async (filters = {}) => {
    let select = 't.id, t.name, DATE_FORMAT(t.date, "%Y-%m-%d") as date, t.amount, t.type, t.notes, t.category, tc.name as category_name';
    let query = 'SELECT ' + select + ' FROM transactions as t';
    query += ' JOIN transaction_categories as tc ON t.category = tc.id';
    
    const params = [];

    // Add filtering conditions dynamically
    const conditions = [];

    Object.entries(filters).map(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            if (key === 'name' || key === 'notes') {
                params.push(`%${value}%`);
                conditions.push(`t.${key} LIKE ?`);
                return;
            }
    
            if(key === 'date') {
                // if format is yyyy-mm
                if (value.match(/^\d{4}-\d{2}$/)) {
                    const [year, month] = value.split('-');
                    const [start, end] = GetFirstAndLastDate(year, month);
                    params.push(start, end);
                    conditions.push(`t.${key} BETWEEN ? AND ?`);
                    return;
                }

                // if format is daterange yyyy-mm-dd - yyyy-mm-dd
                if(value.match(/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}$/)) {
                    const [start, end] = value.split(' - ');
                    params.push(start, end);
                    conditions.push(`t.${key} BETWEEN ? AND ?`);
                    return;
                }
                
                // if format is yyyy
                if (value.match(/^\d{4}$/)) {
                    const start = `${value}-01-01`; // Start of the year
                    const end = `${value}-12-31`;  // End of the year
                    params.push(start, end);
                    conditions.push(`t.${key} BETWEEN ? AND ?`);
                    return;
                }
            }
            
            params.push(value);
            conditions.push(`t.${key} = ?`);
            return;
        }
    });

    if (conditions.length) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    return db.execute(query, params);
}

const create = async (data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key) && data[key] !== undefined);
    const values = keys.map(key => data[key]);

    const query = "INSERT INTO transactions (" + keys.join(', ') + ") VALUES (?" + ", ?".repeat(values.length - 1) + " )";

    return db.execute(query, values);
}

const destroy = async (id) => {
    return db.execute('DELETE FROM transactions WHERE id = ?', [id]);
}

const exists = async (id) => {
    return db.execute('SELECT EXISTS(SELECT 1 FROM transactions WHERE id = ? LIMIT 1) as exist', [id]);
}

const update = async (id, data) => {
    const keys = Object.keys(data).filter(key => fields.includes(key) && data[key] !== undefined);
    const values = keys.map(key => data[key]);

    const query = "UPDATE transactions SET " + keys.map(key => key + ' = ?').join(', ') + " WHERE id = ?";

    return db.execute(query, [...values, id]);
}

export default {
    all,
    create,
    destroy,
    exists,
    update
}