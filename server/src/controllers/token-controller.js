import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.ternakku_refresh_token;

        if (!refreshToken) {
            return res.status(401).send({ message: 'Refresh token is required' });
        }

        const [ rows ] = await User.findByRefreshToken(refreshToken);

        if (rows.length === 0) {
            return res.status(401).send({ message: 'Invalid refresh token' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid refresh token' });
            }

            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
            res.status(200).send({ accessToken });
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export default {
    refreshToken
}