import { mongoose, prop } from "@typegoose/typegoose";
import PostClass from "./PostClass";
import UserClass from "./UserClass";


class CommentClass {

     @prop({ required: true })
     text!: string

     @prop({ ref: UserClass, required: true })
     userId!: mongoose.Types.ObjectId

     @prop({ ref: PostClass, required: true })
     postId!: mongoose.Types.ObjectId

}
export default CommentClass