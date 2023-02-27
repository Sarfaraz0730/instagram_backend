import express from 'express';
import client from './client';

let router = express.Router();

router.use('/client', client);
router.use("/", async (req, res, next) => {

     res.json(
          {
               message: `Node is running successfully. v25.`,
               NODE_ENV: router.get("env"),
               COPILOT_ENVIRONMENT_NAME: process.env.COPILOT_ENVIRONMENT_NAME,
               COPILOT_APPLICATION_NAME: process.env.COPILOT_APPLICATION_NAME,
               COPILOT_SERVICE_NAME: process.env.COPILOT_SERVICE_NAME,
          }
     );
})


export default router;