import UserModel from '../models/userModel.js';
import 'dotenv/config'
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

const strategy = () => {
    return new LocalStrategy({ 
        usernameField: 'email', // because we use email as the unique identifier for our users, we will use it as the username field
        passwordField: 'password',
        passReqToCallback: true 
    }, async (req, username, password, done) => {
        // STEP 2 OF AUTHENTICATION: Verify the user's credentials
    
        try {
            // find the user by their email 
            const [ rows ] = await UserModel.findByEmail(username);
    
            // if the user is not found, return an error
            if (rows.length === 0) {
                return done(null, false);
            }
    
            const user = rows[0];
    
            // if the user is found, compare the password
            const result = await new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        reject(err);
                    }
    
                    resolve(result);
                });
            });
    
            // if the password is incorrect, return an error
            if (!result) {
                return done(null, false);
            }
            
            // if the password is correct, return the user
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    });
}

export default {
    strategy
}