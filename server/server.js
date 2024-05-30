import express from 'express'
import http from 'http'
import serverConnection from './config/serverConnection.js';
import mongoDBConnect from './config/dbConnection.js';
import expressConfig from './middleware/expressMiddlewares.js'
import errorHandler from './middleware/errorHandler.js'
import routes from './routes/index.js'



const app = express();
const server = http.createServer(app)

// Middleware configuration
expressConfig(app)


// Error Handling Middleware
errorHandler(app)

// Routes Configurations
routes(app)


// Connecting the Atlas database
mongoDBConnect()

// Starting the server
serverConnection(server)