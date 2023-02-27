import express from "express"
import { verify } from "../../helper/jwt"

const router = express.Router()

router.get("/", verify, async (req: any, res: any, next: any) => {
     const userDetails = req.verifyUserDetails
     // console.log(userDetails);
     if (!userDetails) {
          return res.status(404).send("Unathorized user")
     }

     return res.send(userDetails)
})
export default router