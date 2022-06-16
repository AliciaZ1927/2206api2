import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
///////////////////////////////////////

import { database } from "./database/connectdb.js";
import authRouter from './routes/auth.routes.js';
import linkRouter from './routes/link.routes.js';
import redirectRouter from './routes/redirect.routes.js'
import miOsRouter from './routes/miOs.routes.js'
import booksRouter from './routes/books.routes.js'


////////////////////////////////////////

const app = express();
/*
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3];

app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback("CORS錯誤")
    }
}));
*/
const corsOptions = {
    // origin: [
    //   'http://localhost:8080/', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:80'
    // ],
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const port = process.env.port || 5001;

// backend redirect
app.use('/', redirectRouter);


app.use('/api/auth', authRouter);
app.use('/api/v1/links', linkRouter);

app.use('/api', miOsRouter);
app.use('/api', booksRouter);



try {
    await database.sync({force: false})
    app.listen(port, () => console.log(`http://localhost:${port}/`))
    console.log('db ok')
} catch (error) {
    console.log('Unable to connect to the database:', error)
}
