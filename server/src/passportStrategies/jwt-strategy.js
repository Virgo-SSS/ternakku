import JwtPassport from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import 'dotenv/config'
import UserModel from '../models/user.js';

const strategy = () => {
    const JwtStrategy = JwtPassport.Strategy;
    
    return new JwtStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
        console.log('Step 2: Verify the user\'s credentials', payload);
    
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