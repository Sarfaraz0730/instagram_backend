import express from "express";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router();

router.use("/", verify, async (req: any, res: any, next: any) => {
     const userId = req.query[0]

     if (!userId) {
          return res.status.send("usersTimeline Id expected")
     }
     try {
          const usersTimelineDetails = await UserModel.findById({ _id: userId })
          if (!usersTimelineDetails) {
               return res.status.send("usersTimeline details not found")

          }

          return res.send(usersTimelineDetails)
     } catch (err) {
          return err
     }
})
export default router