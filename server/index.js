import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import routes from './routes/Routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});