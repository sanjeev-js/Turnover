import { Server } from '@overnightjs/core';
import express from 'express';
import dotenv from 'dotenv';
import { Server as httpServer } from 'http';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import cors from 'cors';
import path from "path";
import { morganErrorHandler, morganSuccessHandler } from './config/morgan';
import logger from './config/logger';
dotenv.config();

const port = process.env.PORT ?? 8000;

export class ExpressServer extends Server {
    constructor() {
        super();
        this.setupExpress();
        this.setupControllers();

        // FOR Handling client side routing i.e browser hard refresh
        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve('public', 'index.html'));
        });
    }

    private setupExpress(): void {
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json({ limit: '900mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morganErrorHandler);
        this.app.use(morganSuccessHandler);
        this.app.use(cors());
    }

    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }

    public start(): httpServer {
        return this.app.listen(port, () => {
            logger.debug('Server listening on port:' + port);
        });
    }
}

const server = new ExpressServer();

server.start();

export default ExpressServer;