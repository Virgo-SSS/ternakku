import 'dotenv/config'
import express, { json } from 'express';
import routesV1 from './routes/api-v1.js';
import cors from 'cors';
import passport from 'passport';
import JwtStrategy from './passportStrategies/jwt-strategy.js';
import cookieParser from 'cookie-parser';

const app = express();

// initialize passport
app.use(passport.initialize());
passport.use('jwt', JwtStrategy.strategy());

app.use(cookieParser());
app.use(json());    
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true,              // Allow cookies and other credentials
}))
app.use('/' , routesV1);

app.listen(3000, () => {
    console.log('Server is running on port 3000 and ready to accept requests!');
});