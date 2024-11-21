
import UserModel from '../models/User.js';
import UserProfileModel from '../models/UserProfile.js';

const register = async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await UserModel.addUser(body);
        const userId = rows.insertId;

        await UserProfileModel.addUserProfile(userId, body);

        res.status(201)
        .json({
            status: "success",
            message: "User has been registered",
            data: {
                user: {
                    id: userId,
                    name: body.name,
                    email: body.email,
                    phone_number: body.phone_number
                }
            }
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        }, 500);
    }
}

export default {
    register
}