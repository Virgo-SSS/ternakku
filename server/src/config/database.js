import mysql from 'mysql2';
import 'dotenv/config'

// Create a connection to the database
// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307,
    database: process.env.DB_NAME || 'ternakku_db',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
});

export default db.promise();