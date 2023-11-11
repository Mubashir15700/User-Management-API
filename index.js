import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import Connection from './database/database.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

Connection();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});