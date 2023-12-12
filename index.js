import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';



//config env
dotenv.config();

//database connection


//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());



//routes





//test api
app.get('/',(req, res) => {
    res.send('Hello World');
});

//PORT
const PORT = process.env.PORT || 5000;


//run listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgGreen.white.bold);
});