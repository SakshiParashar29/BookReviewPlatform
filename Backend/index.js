import express from 'express'
import connectDB from './Database/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './Routes/routes.js'
import {errorHandler} from './Middlewares/errorHandler.js'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', router);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("app is listening to port ", PORT);
});
