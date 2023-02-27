import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { CommentModel, PostModel, UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router()


router.post("/", verify, async (req: any, res: any, next: any) => {

     const verifiedData = req.verifyUserDetails;
     if (!verifiedData) {
          return res.status(404).send("Unauthorised Access")

     }
     const userId = req.verifyUserDetails._id

     const postId = req.query.postId
     const text = req.query.text;
     const data = req.query

     if (!text) {
          return res.status(404).send("text and PostId Required")
     }

     if (!postId) {
          return res.status(404).send(" PostId Required")

     }

     const postDetails = await PostModel.findById({ _id: new mongoose.Types.ObjectId(postId) })
     if (!postDetails) {
          return res.send("Post Details not found")
     }
     const postUserId = postDetails.userId
     try {
          const postUserDetails = await UserModel.findById({ _id: new mongoose.Types.ObjectId(postUserId) })

          if (!postUserDetails) {
               return res.status(404).send(" User who has posted Details not found")
          }

          const postUserFriendList = postUserDetails.follower

          if (!postUserFriendList || postUserFriendList.length === 0) {
               return res.status(404).send("You have no friend to comment only you can comment on your post")
          }
          if (String(userId) === String(postUserId)) {
               const comments = await CommentModel.create({ text, userId, postId })
               return res.send(comments)
          }

          for (let i = 0; i < postUserFriendList.length; i++) {
               if (String(postUserFriendList[i]) === String(userId)) {
                    const commentObj = { text, userId, postId }
                    const comments = await CommentModel.create(commentObj)
                    return res.send(comments)
               } else {
                    console.log("you  cannot comment because you are not in friendlist");
               }
          }
          return res.status(404).send("userId not found")
     } catch (err) {
          return err
     }
})
export default router

