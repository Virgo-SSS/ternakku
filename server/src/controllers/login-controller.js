import db from '../config/database.js';

const login = async (req, res) => {

    try {
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";
        [ rows, fields ]  = await db.execute(query, [req.body.username, req.body.password]);
        
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}

export default {
    login
}