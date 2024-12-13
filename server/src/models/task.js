import db from '../config/database.js';

const fields = [
    'title',
    'deadline',
    'category',
    'priority',
    'status',
    'details',
    'reminder_date',
    'worker_id',
    'cow_id'
];

const all = async () => {
    return await db.execute('SELECT * FROM tasks');
};

const create = async (data) => {
    // get all user keys and value data that are in the fields array
    const keys = Object.keys(data).filter(key => fields.includes(key));
    const values = keys.map(key => data[key]);
    
    const query = `INSERT INTO tasks (${keys.join()}) VALUES (${keys.map(() => '?').join()})`;

    return await db.execute(query, values);
};

const findUpcomingTask = async () => {
    return await db.execute('SELECT * FROM tasks WHERE deadline >= CURDATE() ORDER BY deadline ASC LIMIT 1');
}

export default {
    all,
    create,
    findUpcomingTask
}
