import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";
const router = express.Router();
router.get("/", verify, async (req: any, res: any, next: any) => {

     const verifiedUserId = req.verifyUserDetails._id
     const friendList = req.verifyUserDetails.follower;

     if (friendList.length === 0) {
          return res.status(400).send("You have zero Friend Now")
     }
     try {
          const pipeline = [{
               $match: {
                    // _id: ObjectId('637622375a5a6fdc196702e9')
                    _id: new mongoose.Types.ObjectId(verifiedUserId)
               }
          }, {
               $unwind: {
                    path: '$follower'
               }
          }, {
               $project: {
                    follower: 1
               }
          }, {
               $lookup: {
                    from: 'instaUser_S',
                    localField: 'follower',
                    foreignField: '_id',
                    as: 'follower'
               }
          }, {
               $group: {
                    _id: '$_id',
                    myFriendList: {
                         $push: '$follower'
                    }
               }
          }, {
               $project: {
                    myFriendList: 1,
                    _id: 0
               }
          }]

          const allFriendListDetails = await UserModel.aggregate(pipeline).exec()
          if (!allFriendListDetails) {
               return res.status(400).send("No data found")
          }

          return res.send(allFriendListDetails)


     } catch (err) {
          return err
     }
})
export default router