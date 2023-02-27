import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { PostModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router();

router.get("/", verify, async (req: any, res: any, next: any) => {

     const postId = req.query[0]
     if (!postId) {
          return res.status(404).send("postId expected")
     }
     try {
          const postDetails = await PostModel.findById({ _id: new mongoose.Types.ObjectId(postId) })
          if (!postDetails) {
               return res.status(404).send("postDetails not found may be post details deleted from db ")
          }
          return res.send(postDetails)
     } catch (err) {
          return err
     }
})
export default router