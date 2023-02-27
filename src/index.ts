import cors from "cors";
import express from 'express';
import helmet from "helmet";
import route from "./routes"
require('dotenv').config()
const app = express();
import morgan from "morgan";
import { databaseConnect } from "./database/index";


import multer, { FileFilterCallback } from "multer";
import path from "path";

// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }))

var server = app.listen(3000, () => {
    console.log(`SERVER now running on PORT 3000`);
    console.log(`ENV_CHECK ${process.env.ENV_CHECK}`);
    console.log(app.get("env"));
})
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

databaseConnect()

app.use('/static', express.static(__dirname + '/routes/client/uploads'));

app.use("/", routes)
app.use((_err: any, req: any, res: any, next: any) => {
    if (_err) {
        if (typeof _err == 'string') {
            return res.status(404).send(_err);
        }
        return res.status(404).send(_err.message);
    }
    res.send("Failure")
})

async function closeGracefully(signal: NodeJS.Signals) {
    console.log(`*^ !@4 => Received signal to terminate: ${signal} `)

    await server.close();

    console.log("Closed express");
    // await db.close() if we have a db connection in this app
    // await other things we should cleanup nicely
    process.exit()
}
process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)
process.on('SIGUSR2', closeGracefully)
process.on('SIGHUP', closeGracefully)






