import express from "express";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router();

router.post("/", verify, async (req: any, res: any, next: any) => {
     const verifyUser = req.verifyUserDetails

     const verifiedUsername = req.verifyUserDetails.username
     // var friendRequestId = req.query[0]
     const thisUserHasSentMeFriendRequest = req.query[0]
     if (!thisUserHasSentMeFriendRequest) {
          return res.status(404).send("Username expected")
     }
     const verifiedUserFriendRequest = req.verifyUserDetails.friendRequest;
     try {
          const userDetails = await UserModel.findOne({ username: thisUserHasSentMeFriendRequest })

          if (!userDetails) {
               return res.status(404).send("User who has sent friend request details not found")
          }
          const rejectFriendRequestId = userDetails?._id
          var include = verifiedUserFriendRequest.includes(rejectFriendRequestId)


          const isFriendRequestExist = verifiedUserFriendRequest.length;

          if (!isFriendRequestExist) {
               return res.send(`${verifyUser.username} there is no friend request Available`);
          }
          else if (isFriendRequestExist) {
               const rejectedfR = await UserModel.updateOne({ username: verifiedUsername }, { $pull: { friendRequest: { $in: [rejectFriendRequestId] } } })
               return res.send(`${verifiedUsername} has rejected ${thisUserHasSentMeFriendRequest}`)
          }

          return res.send(`${verifiedUsername} you do not have any friend request right now`)
     } catch (err) {
          return err
     }
})

export default router


