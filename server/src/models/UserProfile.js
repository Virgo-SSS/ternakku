import db from '../config/database.js';

const addUserProfile = async (userId, body) => {
    const query = "INSERT INTO user_profiles (user_id, phone_number) VALUES (?, ?)";
    const values = [
        userId,
        body.phone_number,
    ];

    return db.execute(query, values);
}

export default {
    addUserProfile
}