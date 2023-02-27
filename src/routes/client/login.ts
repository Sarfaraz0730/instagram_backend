import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "../../dbs";

let router = express.Router()

router.post("/", async (req: any, res: any, next: any) => {
     const { email, password } = req.body;
     if (!email) {
          return res.status(404).send("Email  Expected")
     }
     if (!password) {
          return res.status(404).send(" password Expected")

     }

     try {
          const matched = await UserModel.comparePassword(email, password);
          if (matched) {
               return res.json({
                    token: jsonwebtoken.sign({ user: email }, process.env.JWT_SECRET ?? ""),
                    message: "Success"
               });

          }
          else {
               return res.status(401).json({ message: "The email and password  are invalid" })
          }
     } catch (error) {
          return res.send("Login failed")
     }
})

export default router