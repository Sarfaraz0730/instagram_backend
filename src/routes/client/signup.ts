import express from "express";
import { UserModel } from "../../dbs";

let router = express.Router();

router.post("/", async (req: any, res: any, next: any) => {
     const data = req.body;
     if (!data.email) {
          return res.status(404).send("email address expected")
     }
     if (!data.password) {
          return res.status(404).send("Please enter password")

     }
     if (!data.username) {
          return res.status(404).send("username required")

     }

     try {
          let isUserAlreadyExist = await UserModel.findOne({ email: data.email })

          if (isUserAlreadyExist) {
               return res.status(400).send("User with this name  Exist")
          }
          if (!isUserAlreadyExist) {
               try {
                    await UserModel.create(data);
               } catch (error) {
                    console.log({ error });
                    next(error)
                    return
               }
               return res.status(200).send(data);
          }
     }
     catch (error) {
          return res.status(400).send("Signup failed")
     }

})
export default router


















