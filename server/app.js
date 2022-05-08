// Import Packages
import express, { response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
dotenv.config(); // Project route directory
// Import Routes
import router from './router'



const app = express()

// Connect DB
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('DB connected')
    // declare port number
    const PORT = process.env.PORT || 3000;
    // listen for request
    app.listen(PORT, ()=> {
      console.log(`Working on ${PORT} port`)
    });
  })
  .catch((err) => {
    console.log(err);
  });


// Midlewares
app.use(cors({origin: 'http://localhost:8080'}))
app.use(morgan('dev'));
app.use(express.json());
// Route Middlewares
app.use('/', router);

