
import jsonwebtoken from "jsonwebtoken";
import { NextFunction } from "express";
import { UserModel } from "../dbs";

require('dotenv').config()

const verify = (req: any, res: any, next: NextFunction) => {
     let bearerHeader = req.headers["authorization"]?.split(" ")[1];


     var token = bearerHeader
     jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "", async function (err: any, decoded: any) {
          if (err) {
               req.aurhenticated = false;
               req.decoded = null;
               next(err)
          } else {
               try {
                    req.decoded = decoded;
                    req.aurhenticated = true
                    req.verifyUserDetails = await UserModel.findOne({ email: req.decoded.user })
                    next()
               } catch (error) {
                    return error
               }
          }
     })
}
export {

     verify
}