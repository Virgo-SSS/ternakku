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
    return db.execute('SELECT * FROM tasks');
};

const create = async (data) => {
    // get all user keys and value data that are in the fields array
    const keys = Object.keys(data).filter(key => fields.includes(key));
    const values = keys.map(key => data[key]);
    
    const query = `INSERT INTO tasks (${keys.join()}) VALUES (${keys.map(() => '?').join()})`;

    return db.execute(query, values);
};

const findUpcomingTask = async () => {
    return db.execute('SELECT * FROM tasks WHERE deadline >= CURDATE() ORDER BY deadline ASC LIMIT 1');
}

const destroy = async (id) => {
    return db.execute('DELETE FROM tasks WHERE id = ?', [id]);
}

const updateStatus = async (id, status) => {
    return db.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
}

export default {
    all,
    create,
    findUpcomingTask,
    destroy,
    updateStatus
}
