import { mongoose } from "@typegoose/typegoose"
import express from "express"
import { PostModel } from "../../dbs"
import { verify } from "../../helper/jwt"
const router = express.Router()

router.get("/", verify, async (req: any, res: any, next: any) => {
     const userId = req.query[0]
     if (!userId) {
          return res.send("timeline  userId expected")
     }
     try {
          const pipeline = [
               {
                    // postId: new mongoose.Types.ObjectId(postId)
                    $match: {
                         // userId: ObjectId("6386554902f026e85902f0d2"),
                         userId: new mongoose.Types.ObjectId(userId)
                    },
               },
               {
                    $group: {
                         _id: "$userId",
                         allPost: {
                              $push: "$$ROOT",
                         },
                    },
               },
          ]
          const allPost = await PostModel.aggregate(pipeline).exec()
          if (!allPost) {
               return res.send("This user has not posted anything yet")
          }
          return res.send(allPost)
     } catch (err) {
          return err
     }
})

export default router