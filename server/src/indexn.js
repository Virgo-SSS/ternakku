import express, { json } from 'express';
import routesV1 from './routes/api-v1.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(routesV1);

app.listen(3000, () => {
    console.log('Server is running on port 3000 and ready to accept requests!');
});