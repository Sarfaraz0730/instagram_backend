import { mongoose } from "@typegoose/typegoose"
import express from "express"
import UserClass from "../../classes/UserClass"
import { CommentModel, PostModel, UserModel } from "../../dbs"
import { verify } from "../../helper/jwt"

const router = express.Router()

router.get("/", verify, async (req: any, res: any, next: any) => {

     const postId = req.query[0]


     if (!postId) {
          return res.status(404).send("Post Id required to get the comments on perticular post")
     }
     // postId: new mongoose.Types.ObjectId(postId)
     try {
          const whoPosted = await PostModel.findById({ _id: new mongoose.Types.ObjectId(postId) })

          if (!whoPosted) {
               return res.status(404).send("the user who has posted this image details not found")
          }
          const userWhoPostedId = whoPosted.userId

          const userWhoPostedDetails = await UserModel.findById({ _id: new mongoose.Types.ObjectId(userWhoPostedId) })
          if (!userWhoPostedDetails) {
               return res.status(404).send("the user who has posted this image details not found")

          }


          const pipeline = [
               {
                    $match: {
                         postId: new mongoose.Types.ObjectId(postId)
                    },
               },
               {
                    $lookup: {
                         from: "instaUser_S",
                         localField: "userId",
                         foreignField: "_id",
                         as: "result",
                    },
               },
               {
                    $unwind: {
                         path: "$result",
                    },
               },
               {
                    $project: {
                         fullName: "$result.fullName",
                         username: "$result.username",
                         text: 1,
                         userId: 1,
                         postId: 1,
                    },
               },
               {
                    $group: {
                         _id: "$postId",
                         AllComments: {
                              $push: "$$ROOT",
                         },
                    },
               },
               {
                    $project: {
                         AllComments: 1,
                         _id: 0,
                    },
               },
          ]

          const allCommentOnPerticularPost = await CommentModel.aggregate(pipeline).exec()

          if (!allCommentOnPerticularPost) {
               return res.status(400).send("No COmment")
          }
          const PostAndUserData = { userWhoPostedDetails, allCommentOnPerticularPost }

          return res.send(PostAndUserData);

     } catch (err) {
          return err
     }
})
export default router