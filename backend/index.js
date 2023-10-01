import express from 'express'
import { PORT , mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use('/books', booksRoute);

//Middleware for handling cors policy
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/' , (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN STACK PROJECT');
});


mongoose.connect(mongoDBURL).then(() => {
    console.log('App connnected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    })
})
.catch((error) => {
    console.log(error);
})

