import config from "./config/config";
import logger from "./config/logger";
import http from 'http';
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import bookRoutes from './routes/books';
import userRoutes from './routes/user';
import middleware from './controllers/middleware';
import mongoose from "mongoose";

const router = express()

mongoose.connect(config.mongo.url)
        .then(()=>{
            logger.info('MongoDB connected!')
        })
        .catch((error)=>{
            logger.error(error.message, console.error);            
        })

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`METHOD: [${req.method}] - URL - [${req.url}] - IP[${req.socket.remoteAddress}]`)
    res.on('finish', ()=>{
        logger.info(`METHOD: [${req.method}] - URL - [${req.url}] - STATUS [${res.statusCode}] - IP[${req.socket.remoteAddress}]`)
    });
    next();
})

router.use('/api', userRoutes)

router.use('/api', middleware.verifyTokens, bookRoutes);

router.use((req: Request, res: Response, next: NextFunction)=>{
    const error = new Error('Not found')

    res.status(404).json({
        message:error.message
    });
})

const httpServer= http.createServer(router);

httpServer.listen(config.server.port, ()=>{
    logger.info(`Server is running on ${config.server.hostname}:${config.server.port}`);
})

