import mysql from 'mysql2';

// Create a connection to the database
// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ternakku',
});

export default db.promise();