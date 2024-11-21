import express, { json } from 'express';
import routesV1 from './routes/api-v1.js';
import logMiddleware from './middleware/log-middleware.js';

const app = express();

app.use(json());
app.use(logMiddleware);
app.use('/' , routesV1);

app.listen(3000, () => {
    console.log('Server is running on port 3000 and ready to accept requests!');
});