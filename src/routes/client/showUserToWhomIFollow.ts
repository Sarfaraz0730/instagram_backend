import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router();

router.get("/", verify, async (req: any, res: any, next: any) => {

     const verifiedUserId = req.verifyUserDetails._id;
     const Following = req.verifyUserDetails.following;
     if (!Following) {
          return res.status(400).send("You have zero following right now")
     }

     try {
          const pipeline = [{
               $match: {
                    // _id: ObjectId('6377389f4a1240a2edbc6de2')
                    _id: new mongoose.Types.ObjectId(verifiedUserId)

               }
          }, {
               $project: {
                    following: 1
               }
          }, {
               $unwind: {
                    path: '$following'
               }
          }, {
               $lookup: {
                    from: 'instaUser_S',
                    localField: 'following',
                    foreignField: '_id',
                    as: 'followings'
               }
          }, {
               $group: {
                    _id: '$_id',
                    myFollowing: {
                         $push: '$followings'
                    }
               }
          }, {
               $project: {
                    _id: 0
               }
          }]


          const allFollowingDetails = await UserModel.aggregate(pipeline).exec()
          if (!allFollowingDetails) {
               return res.status(400).send("No data found")
          }

          return res.send(allFollowingDetails)
     } catch (err) {
          return err
     }
})

export default router