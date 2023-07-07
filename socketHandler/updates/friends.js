const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitaiton");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId
    }).populate('senderId', '_id username mail');

    //find if user have active connections
  } catch (error) {
    console.log(error)
  }
}