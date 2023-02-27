import { getModelForClass } from "@typegoose/typegoose";
import CommentClass from "../classes/Comments";
import PostClass from "../classes/PostClass";
import UserClass from "../classes/UserClass"

const UserModel = getModelForClass(UserClass, { schemaOptions: { collection: "instaUser_S" } })
const PostModel = getModelForClass(PostClass, { schemaOptions: { collection: "instaPost_S" } })
const CommentModel = getModelForClass(CommentClass, { schemaOptions: { collection: "instaComment_S" } })



export {
     UserModel, PostModel, CommentModel
}
// UserMode
//PostModel
//CommentModel