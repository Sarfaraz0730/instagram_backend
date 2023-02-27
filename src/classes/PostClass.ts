import { mongoose, prop } from "@typegoose/typegoose";
import UserClass from "./UserClass";


class PostClass {

     @prop()
     image?: string

     @prop({ required: true })
     description!: string;

     @prop({ ref: UserClass })
     likes?: mongoose.Types.ObjectId[] = []

     @prop({ ref: UserClass, required: true })
     userId!: mongoose.Types.ObjectId

}
export default PostClass