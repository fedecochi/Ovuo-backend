import dotenv from 'dotenv';
import express from 'express';
import { mongoose } from 'mongoose';
import userRoute from './route/user.js';

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
dotenv.config()
app.listen(3000, () => {
    console.log(`backend is running on port ${process.env.PORT}`)
})
//Routes
app.use('/api/user', userRoute)

app.get('/', (req, res) => {
    res.send('Hello Chioma')
})
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("connect to my database Chioma")
    }).catch(() => {
        console.log("unable to connect to database Chioma")
    });