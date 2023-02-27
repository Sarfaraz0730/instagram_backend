import express from "express";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router();

router.post("/", verify, async (req: any, res: any, next: any) => {
     const username = req.query.username
     if (!username) {
          return res.status(404).send("Username expected")
     }
     try {
          const searchFriend = await UserModel.findOne({ username: username })
          if (!searchFriend) {
               return res.status(404).send("user with this name  not found / not exist")
          }

          return res.send(searchFriend)
     } catch (err) {
          return err
     }
})
export default router