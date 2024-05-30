import express from 'express'
import cors from 'cors';
import cookieParser from 'express'
import configKeys from '../config/configKeys.js';

const expressConfig = (app)=>{
    // Enabling CORS
    const enableCors = {
        origin: [
            configKeys.CLIENT_URL
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        exposeHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy'],
        // credentials: true
    }


    // Express middlewares configuration
    app.use(cors(enableCors))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())
}

export default expressConfig