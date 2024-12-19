import JwtPassport from 'passport-jwt';
import 'dotenv/config'
import UserModel from '../models/User.js';

const strategy = () => {
    const JwtStrategy = JwtPassport.Strategy;
    
    return new JwtStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: JwtPassport.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
    
        try {
            const [ rows ] = await UserModel.findById(payload.id);
            if (rows.length === 0) {
                return done(null, false);
            }
    
            const user = rows[0];
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
}

export default {
    strategy
}