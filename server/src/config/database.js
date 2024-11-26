import mysql from 'mysql2';
import 'dotenv/config'

// Create a connection to the database
// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ternakku_db',
});

export default db.promise();