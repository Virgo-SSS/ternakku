import bcrypt from 'bcrypt';
import db from '../config/database.js';

const addUser = async (body) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    
    const values = [
        body.name,
        body.email,
        await bcrypt.hash(body.password, 13)
    ];

    return db.execute(query, values);
}

export default {
    addUser
}