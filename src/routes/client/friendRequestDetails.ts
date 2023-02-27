import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router()

router.get("/", verify, async (req: any, res: any, next: any) => {
     const verifiedUser = req.verifyUserDetails
     const verifiedUserId = req.verifyUserDetails._id
     var friendRequest = req.verifyUserDetails.friendRequest
     if (friendRequest.length == 0) {
          return res.send("You have no friend request")
     }
     try {
          const pipeline = [{
               $match: {
                    // _id: ObjectId('637622375a5a6fdc196702e9')
                    _id: new mongoose.Types.ObjectId(verifiedUserId)
               }
          }, {
               $unwind: {
                    path: '$friendRequest'
               }
          }, {
               $project: {
                    friendRequestId: '$friendRequest'
               }
          }, {
               $lookup: {
                    from: 'instaUser_S',
                    localField: 'friendRequestId',
                    foreignField: '_id',
                    as: 'friendRequestDetailsFromFR_id'
               }
          }, {
               $unwind: {
                    path: '$friendRequestDetailsFromFR_id'
               }
          }, {
               $project: {
                    _id: 1,
                    friendRequestDetailsFromFR_id: 1
               }
          }, {
               $group: {
                    _id: '$_id',
                    friendRequestData: {
                         $push: '$$ROOT'
                    }
               }
          }, {
               $project: {
                    _id: 0
               }
          }]

          const allFriendrequestDetails = await UserModel.aggregate(pipeline).exec()
          if (!allFriendrequestDetails) {
               return res.status(400).send("No data found")
          }
          return res.send(allFriendrequestDetails)
     } catch (err) {
          return err
     }
})
export default router