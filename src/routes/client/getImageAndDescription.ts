import { mongoose } from "@typegoose/typegoose";
import express from "express"
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";
const router = express.Router();

router.get("/", verify, async (req: any, res: any, next: any) => {
     const verifyUser = req.verifyUserDetails;
     const verifiedUserId = verifyUser._id

     try {
          const pipeline = [
               {
                    $match: {
                         // _id: ObjectId("638742859ef4b9812bf1e9d6"),
                         _id: new mongoose.Types.ObjectId(verifiedUserId)
                    },
               },
               {
                    $project: {
                         username: 1,
                         follower: 1,
                    },
               },
               {
                    $unwind: {
                         path: "$follower",
                    },
               },
               {
                    $lookup: {
                         from: "instaUser_S",
                         localField: "follower",
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
                         username: 1,
                         friendId: "$follower",
                         friendName: "$result.username",
                         friendEmailId: "$result.email",
                    },
               },
               {
                    $lookup: {
                         from: "instaPost_S",
                         localField: "friendId",
                         foreignField: "userId",
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
                         friendPostedImage: "$result.image",
                         description: "$result.description",
                         authUser: "$username",
                         authUserId: "$_id",
                         friendName: 1,
                         friendId: 1,
                         postId: "$result._id",
                         _id: 0,
                         likes: "$result.likes",
                    },
               },
               {
                    $group: {
                         _id: "$authUserId",
                         allMyFriendPost: {
                              $push: "$$ROOT",
                         },
                    },
               },
               {
                    $project: {
                         allMyFriendPost: 1,
                         _id: 0,
                    },
               },
          ]
          const allFriendPost = await UserModel.aggregate(pipeline).exec()
          if (!allFriendPost) {
               return res.send("none of your friend has posted anything yet")
          }
          return res.send(allFriendPost)

     } catch (err) {
          return err
     }
})
export default router

