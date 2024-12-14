import express, { json } from 'express';
import routesV1 from './routes/api-v1.js';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors({
    origin: '*',
}))
app.use('/' , routesV1);

app.listen(3000, () => {
    console.log('Server is running on port 3000 and ready to accept requests!');
});