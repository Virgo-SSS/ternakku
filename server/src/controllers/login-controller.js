import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import UserModel from '../models/user.js';

// TODO: ADD VALIDATION
const login = async (req, res, next) => {
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
                    email: user.email,
                    token: "Bearer " + jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
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

const logout = async (req, res) => {
    res.status(200)
    .json({
        message: "Logout successful"
    });
}

export default {
    login,
    logout
}