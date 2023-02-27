import express from 'express';
import UserClass from '../../classes/UserClass';
import { PostModel, UserModel } from '../../dbs';
import { verify } from '../../helper/jwt';

let router = express.Router();

router.patch('/', verify, async (req: any, res, next) => {
     const userDetails: UserClass = req.verifyUserDetails; // Sarfaraz

     const postId = req.query[0];


     if (!postId) {
          res.status(400).send("Post ID expected");
          return;
     }

     const postDetails = await PostModel.findById(postId);
     if (!postDetails) {
          res.status(404).send("Post not found");
          return;
     }

     const postUserId = postDetails.userId;
     const postUserDetails = await UserModel.findById(postUserId); // Rohit's Details
     if (!postUserDetails) {
          res.status(404).send("Post user account not found");
          return;
     }

     const postFriendList = postUserDetails.follower; // Rohit's Friends
     if (!postFriendList || postFriendList.length === 0) {
          res.status(404).send("Oops! you are not allowed to like this post.");
          return;
     }
     if (postUserDetails._id.toString() !== userDetails._id.toString()) {
          if (!postFriendList.map(id => id.toString()).includes(userDetails._id.toString())) {
               res.status(404).send("Oops! you are not allowed to like this post.");
               return;
          }
     }

     // SUCCESS LOGIC FOR LIKE 
     if (!postDetails.likes) {
          postDetails.likes = [userDetails._id];
          postDetails.save();
     }

     if (postDetails.likes) {
          const index = postDetails.likes.map(id => id.toString()).indexOf(userDetails._id.toString());
          if (index === -1) {
               // SUCCESS LOGIC FOR LIKE
               postDetails.likes.push(userDetails._id);
               postDetails.save()
          }
          else {
               // SUCCESS LOGIC FOR DISLIKE
               postDetails.likes.splice(index, 1);
               postDetails.save()
          }
     }

     res.send(postDetails);
})

export default router;








