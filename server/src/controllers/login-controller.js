import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import UserModel from '../models/userModel.js';
import UserProfileModel from '../models/user-profile.js';

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
        const [ userProfile ] = await UserProfileModel.findByUserId(user.id);
        
        if(userProfile.length !== 0) {
            user.phone_number = userProfile[0].phone_number;
            user.profile_picture = userProfile[0].profile_picture;
        }

        if (!await bcrypt.compare(body.password, user.password)) {
            return res.status(401)
            .json({
                message: "Email or password is incorrect"
            });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

        const [ update ] = await UserModel.updateRefreshToken(user.id, refreshToken);
        if (update.affectedRows === 0) {
            throw new Error("Failed to update refresh token");
        }

        res.cookie("ternakku_refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Required for cross-origin requests
        });

        res.status(200)
        .json({
            status: "Success",
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone_number: user?.phone_number || null,
                    profile_picture: user?.profile_picture || null
                },
                token: "Bearer " + accessToken,
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
    const refreshToken = req.cookies.ternakku_refresh_token;

    if (!refreshToken) {
        return res.status(401)
        .json({
            message: "Refresh token is required"
        });
    }

    const [ rows ] = await UserModel.findByRefreshToken(refreshToken);

    if (rows.length === 0) {
        return res.status(401)
        .json({
            message: "Invalid refresh token"
        });
    }

    const [ update ] = await UserModel.deleteRefreshToken(refreshToken);
    if (update.affectedRows === 0) {
        return res.status(500)
        .json({
            message: "Failed to delete refresh token"
        });
    }

    res.clearCookie("ternakku_refresh_token");
    res.status(200)
    .json({
        message: "Logout successful"
    });
}

export default {
    login,
    logout
}