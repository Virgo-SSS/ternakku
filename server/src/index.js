import 'dotenv/config'
import express, { json } from 'express';
import routesV1 from './routes/api-v1.js';
import cors from 'cors';
import passport from 'passport';
import JwtStrategy from './passportStrategies/jwt-strategy.js';

const app = express();

// initialize passport
app.use(passport.initialize());

passport.use('jwt', JwtStrategy.strategy());

app.use(json());    
app.use(cors({
    origin: '*',
}))
app.use('/' , routesV1);

app.listen(3000, () => {
    console.log('Server is running on port 3000 and ready to accept requests!');
});