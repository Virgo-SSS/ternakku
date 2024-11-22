import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

// TODO: ADD VALIDATION
const login = async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await UserModel.findByEmail(body.email);

        if (rows.length === 0) {
            return res.status(401)
            .json({
                message: "Email or password is incorrect"
            });
        }

        const user = rows[0];

        if (!await bcrypt.compare(body.password, user.password)) {
            return res.status(401)
            .json({
                message: "Email or password is incorrect"
            });
        }

        res.status(200)
        .json({
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
}

export default {
    login
}