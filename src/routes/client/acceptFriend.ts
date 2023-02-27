import { mongoose } from "@typegoose/typegoose";
import express from "express"
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt"

let router = express.Router()


router.post("/", verify, async (req: any, res: any, next: any) => {

     var username = req.verifyUserDetails.username
     var verifyUserId = req.verifyUserDetails._id

     var friendRequestId = req.query[0]


     if (!friendRequestId) {
          return res.status(404).send("friend request Id Expected")
     }

     try {
          var findFriendRequestIdDetails = await UserModel.findById({ _id: new mongoose.Types.ObjectId(friendRequestId) })

          if (!findFriendRequestIdDetails) {
               return res.status(400).send("There is no friendRequest Id Available")
          }
          var findFriendRequestIdDetailsUsername = findFriendRequestIdDetails.username

          const pendingRequest = req.verifyUserDetails.friendRequest;

          const isAlreadyFollower = req.verifyUserDetails.follower

          const index = pendingRequest.indexOf(friendRequestId);

          const isAlreadyFriend = isAlreadyFollower.indexOf(friendRequestId)

          if (isAlreadyFriend == -1) {
               if (index != -1) {
                    const updateUserYourFriendRequestAccepted = await UserModel.updateOne({ username: findFriendRequestIdDetailsUsername }, { $push: { following: [verifyUserId] } })
                    const appendFollower = await UserModel.updateOne({ username: username }, { $push: { follower: [friendRequestId] } })
                    const deletedTheacceptedFriendRequest = await UserModel.updateOne({ username: username }, { $pull: { friendRequest: { $in: [friendRequestId] } } })
               } else {
                    console.log("bye");
               }
               if (index === -1) {
                    return res.send(`${username} has not  accepted by  ${findFriendRequestIdDetailsUsername} please wait `)
               }
               return res.send(`${username} has accepted your friend request ${findFriendRequestIdDetailsUsername}`)
          }
          return res.send(`${username} and ${findFriendRequestIdDetailsUsername} is already Friend`)
     } catch (error) {
          return error
     }
})

export default router


