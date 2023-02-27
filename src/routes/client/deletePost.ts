import { mongoose } from "@typegoose/typegoose"
import express from "express"
import { PostModel } from "../../dbs"
import { verify } from "../../helper/jwt"

const router = express.Router()

router.delete("/", verify, async (req: any, res: any, next: any) => {
     const verifiedUser = req.verifyUserDetails
     const postId = req.body._id
     if (!verifiedUser) {
          return res.status(400).send("Unathorizes User trying to delete post")
     }
     if (!postId) {
          return res.status(404).send("post id i required")
     }

     try {
          const deletePost = await PostModel.findById({ _id: new mongoose.Types.ObjectId(postId) })

          if (deletePost) {
               const deletePostdata = await PostModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(postId) })

               return res.send("Your post has been deleted")
          }
          return res.send("Your Post Already Deleted")
     } catch (err) {
          return err
     }




})
export default router