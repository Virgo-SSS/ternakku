import express, { json } from 'express';
import routesV1 from './routes/api-v1.js';
import cors from 'cors';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserModel from './models/user.js';
import bcrypt from 'bcrypt';
import session from 'express-session';
import 'dotenv/config'

const app = express();

// setup cookie session settings
app.use(session({
    name: 'ternakku-auth',
    secret: process.env.SESSION_SECRET,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: { 
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// create a new instance of the LocalStrategy
passport.use('local', new LocalStrategy({ 
    usernameField: 'email', // because we use email as the unique identifier for our users, we will use it as the username field
    passwordField: 'password',
    passReqToCallback: true 
}, async (req, username, password, done) => {
    // STEP 2 OF AUTHENTICATION: Verify the user's credentials
    console.log(`Step 2: Verify the user's credentials: ${username} and ${password}`);

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
}));

// serialize the user
passport.serializeUser((user, done) => {
    console.log("Step 4: Serialize the user", user);

   return done(null, user.id);
});

// deserialize the user. this function will be called when we want to access the other routes except the login route
passport.deserializeUser(async (id, done) => {
    console.log("Deserialize the user", id);

    const [ rows ] = await UserModel.findById(id);

    if (rows.length === 0) {
        return done(new Error('User not found'));
    }

    const user = rows[0];
    
    return done(null, {
        id: user.id,
        email: user.email,
        name: user.name
    });
});

app.use(json());    
app.use(cors({
    origin: '*',
}))
app.use('/' , routesV1);

app.listen(3000, () => {
    console.log('Server is running on port 3000 and ready to accept requests!');
});