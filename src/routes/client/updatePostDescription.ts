import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { PostModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router()

router.patch("/", verify, async (req: any, res: any, next: any) => {

     const userWhoHasPosted = req.verifyUserDetails
     const postId = req.query.postId;

     const description = req.query.description
     if (!userWhoHasPosted) {
          return res.status(404).send("Unathorized User is trying to Update the post")
     }

     if (!postId) {
          return res.send("Post Id is required to update Post")
     }

     if (!description) {
          return res.status(400).send("description expected to update the post")
     }

     try {
          const updatePostRequest = await PostModel.findById({ _id: new mongoose.Types.ObjectId(postId) })
          console.log("updatePost ", updatePostRequest);
          if (!updatePostRequest) {
               return res.status("the post you want to update is not found")
          }
          if (updatePostRequest) {
               const update = await PostModel.updateOne({ _id: new mongoose.Types.ObjectId(postId) }, { description: description })

               return res.send("Your post has been Updated")
          }
     } catch (err) {
          return err
     }

})
export default router