import * as dotenv from 'dotenv' 
dotenv.config()

import express from 'express';
import connection from './DB/connection.js';
const server = express();
import * as allRoutes from './modules/index.routes.js'
import mongoose from 'mongoose';

server.use(express.json())

server.use("/api/v1/auth", allRoutes.authRouter)
connection();
 



server.get("*", (req, res) => {
    res.json({ message: "invalid url" })
})
server.listen(3000, () => {
    console.log("server running");
})