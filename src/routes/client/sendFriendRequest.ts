import express from "express"
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt"

const router = express.Router()

router.post("/", verify, async (req: any, res: any, next: any) => {

     const verifyId = req.verifyUserDetails._id
     if (!verifyId) {
          return res.status(404).send("Unauthorised Access")
     }
     const usernameOfaPersonToWhoIWantToASendFriendrequest = req.query.username;
     if (!usernameOfaPersonToWhoIWantToASendFriendrequest) {
          return res.status(404).send("username Of a Person To Whom I Want To  A Send Friend request Expected")
     }

     try {
          const userDetails = await UserModel.findOne({ username: usernameOfaPersonToWhoIWantToASendFriendrequest })
          if (!userDetails) {
               return res.status(404).send("User details not found")
          }

          const userArrayOfAPersonToWhomFRgoingToSend = userDetails.friendRequest
          const isAlreadyFriend = userArrayOfAPersonToWhomFRgoingToSend?.includes(verifyId)


          if (isAlreadyFriend) {
               return res.status(400).send(`friend Reqeust already send friend Request to`)

          }
          else if (isAlreadyFriend == false) {
               const friendRequestSend = await UserModel.updateOne({ username: usernameOfaPersonToWhoIWantToASendFriendrequest }, { $push: { friendRequest: [verifyId] } });
               return res.send(`${req.verifyUserDetails.username} has sent friend request to ${usernameOfaPersonToWhoIWantToASendFriendrequest}`)
          }
          return res.send(`${req.verifyUserDetails.username} is trying to send friend request to ${usernameOfaPersonToWhoIWantToASendFriendrequest} not found`)
     } catch (err) {
          return err
     }
})

export default router




