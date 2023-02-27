import express from "express"
import getImageAndDescription from "./getImageAndDescription"
import login from "./login"
import postImage from "./postImage"
import searchFriend from "./searchFriend"
import sendFriendRequest from "./sendFriendRequest"
import signup from "./signup"
import rejectFriend from "./rejectFriend"
import acceptFriend from "./acceptFriend"
import like from "./like"
import comment from "./comment"
import updatePostDescription from "./updatePostDescription"
import deletePost from "./deletePost"
import getUserInfo from "./getUserInfo"
import friendRequestDetails from "./friendRequestDetails"
import showMyFriendList from "./showMyFriendList"
import showUserToWhomIFollow from "./showUserToWhomIFollow"
import usersTime from "./usersTime"
import showSinglePostDetailsForComment from "./showSinglePostDetailsForComment"
import getCommentsOnThePost from "./getCommentsOnThePost"
import allPostOfSingleUser from "./allPostOfSingleUser"
import showAllThePostOfTimelineUser from "./showAllThePostOfTimelineUser"
let router = express.Router()


router.use("/signup", signup)
router.use("/login", login)
router.use("/postImage", postImage)
router.use("/updatePostDescription", updatePostDescription)
router.use("/deletePost", deletePost)
router.use("/like", like)
router.use("/comment", comment)
router.use("/getImageAndDescription", getImageAndDescription)
router.use("/searchFriend", searchFriend)
router.use("/sendFriendRequest", sendFriendRequest)
router.use("/rejectFriend", rejectFriend)
router.use("/acceptFriend", acceptFriend)
router.use("/getUserInfo", getUserInfo)
router.use("/friendRequestDetails", friendRequestDetails)
router.use("/showMyFriendList", showMyFriendList)
router.use("/showUserToWhomIFollow", showUserToWhomIFollow)
router.use("/usersTime", usersTime)
router.use("/showSinglePostDetailsForComment", showSinglePostDetailsForComment)
router.use("/getCommentsOnThePost", getCommentsOnThePost)
router.use("/allPostOfSingleUser", allPostOfSingleUser)
router.use("/showAllThePostOfTimelineUser", showAllThePostOfTimelineUser)



export default router;