import { mongoose, pre, prop } from "@typegoose/typegoose";
import bcrypt from 'bcrypt';
import { UserModel } from "../dbs";

@pre<UserClass>('save', function () {
     if (!this.isModified('password')) {
          return;
     }
     const hashedPassword = bcrypt.hashSync(this.password, 10);
     this.password = hashedPassword;
})


class UserClass {

     _id!: mongoose.Types.ObjectId;

     @prop({ required: true, unique: true, trim: true, match: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })
     email!: string

     @prop({ required: true, trim: true, })
     password!: string;

     @prop({ required: true, maxlength: 30, minlength: 3, trim: true, unique: true })
     username!: string

     @prop()
     fullName?: string;

     @prop({ default: "MALE" })
     gender?: string;

     @prop({ match: /^[0-9]{10}$/ })
     phoneNumber?: string;

     @prop({ ref: UserClass })
     friendRequest?: mongoose.Types.ObjectId[] = []

     @prop({ ref: UserClass })
     follower?: mongoose.Types.ObjectId[] = []

     @prop({ ref: UserClass })
     following?: mongoose.Types.ObjectId[] = []

     static async comparePassword(email: string, password: string) {

          try {
               const doc = await UserModel.findOne({ email });
               if (!doc) return false;
               return bcrypt.compareSync(password, doc.password);

          } catch (error) {
               return error
          }
     }

}
export default UserClass