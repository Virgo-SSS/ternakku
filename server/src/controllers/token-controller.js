import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const refreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;

        const refreshToken = req.cookies.ternakku_refresh_token;

        if (!refreshToken) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Refresh token is required' 
            });
        }

        const [ rows ] = await User.findByRefreshToken(refreshToken);

        if (rows.length === 0) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Invalid refresh token' 
            });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ 
                    status: 'error',
                    message: 'Invalid refresh token' 
                });
            }

            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            res.status(200).json({
                status: 'success',
                message: 'Refresh token success',
                data: {
                    user: {
                        id: rows[0].id,
                        name: rows[0].name,
                        email: rows[0].email
                    },
                    token: `Bearer ${accessToken}`
                }
            })
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

export default {
    refreshToken
}