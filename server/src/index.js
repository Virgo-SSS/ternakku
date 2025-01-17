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
    origin: ['http://localhost:5173', 'https://ternakku.vercel.app'], // Allow requests from this origin
    credentials: true,              // Allow cookies and other credentials
}))
app.use('/api/v1/' , routesV1);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT + ' and environment is ' + process.env.NODE_ENV);
});

export default app;