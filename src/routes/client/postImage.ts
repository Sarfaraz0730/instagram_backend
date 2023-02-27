import express from "express"
import { verify } from "../../helper/jwt"
import multer, { FileFilterCallback } from "multer";
import { PostModel, UserModel } from "../../dbs";
import { mongoose } from "@typegoose/typegoose";
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, __dirname + '/uploads')
     },
     filename: function (req: any, file, cb) {
          cb(null, file.originalname)
     }
})
const fileFilter = (
     request: any,
     file: Express.Multer.File,
     callback: FileFilterCallback
): void => {
     if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/svg' ||
          file.mimetype === 'image/jpeg'
     ) {
          callback(null, true)
     } else {
          callback(null, false)
     }
}

const upload = multer({ storage, fileFilter: fileFilter })

const router = express.Router()
// create post API
router.post("/", verify, upload.single('file'), async (req: any, res: any, next: any) => {



     const description = req.body.description
     const userId = req.verifyUserDetails._id

     // console.log(JSON.stringify(req.body))
     // console.log("req.file", req.file)

     try {
          if (!req.file) {
               return res.json({
                    success: false,
                    message: "You must provide at least 1 file"
               })
          }
          else if (req.file) {
               var image = req.file['path'];
               const postData = { image, description, userId }
               await PostModel.create(postData)
               return res.send("POST SUCCESSULLY DONE")
          }
          // return res.send("UnSuccessful")res.send("UnSuccessful")
     } catch (err) {
          return res.send("UnSuccessful")
     }
})
export default router









