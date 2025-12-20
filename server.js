import dotenv from 'dotenv';
import express from 'express';
import { mongoose } from 'mongoose';
import userRoute from './route/user.js';
import product from './route/product.js';
import cors from 'cors';


const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "https://ovuo-backend.onrender.com",
    "http://localhost:3000",
];
app.use(
    cors({
    origin: function (origin, callback) {
    if (!origin) return callback(null, true); // mobile app, postman
    if (allowedOrigins.includes(origin)) {
    return callback(null, true);
    } else {
    return callback(new Error("Not allowed by CORS"));
    }   
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    })
    );
    
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
dotenv.config()
app.listen(3000, () => {
    console.log(`backend is running on port ${process.env.PORT}`)
})
//Routes
app.use('/api/user', userRoute)
app.use('/api/product', product)

app.get('/', (req, res) => {
    res.send('Hello Chioma')
})
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("connect to my database Chioma")
    }).catch(() => {
        console.log("unable to connect to database Chioma")
    });