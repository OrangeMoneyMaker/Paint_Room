import express from "express";
import http from "http";
import websocket from './websockets/websocket.js';
import mongoose from "mongoose";
import authRouter from './routers/authRouter.js';
import "dotenv/config";
import cookieParser from "cookie-parser";
import errorMiddlewares from "./middlewares/error-middlewares.js";
import cors from 'cors';
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use("/api", authRouter);
app.use(errorMiddlewares);
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECT);
        websocket(server);
        server.listen(8080, () => { console.log("Server start"); });
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=index.js.map