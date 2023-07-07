const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitaiton");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId
    }).populate('senderId', '_id username mail');

    //find if user have active connections

    const receiverList = serverStore.getActiveConnections(userId);
    const io = serverStore.getSocketInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitations:pendingInvitations?pendingInvitations:[],
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  updateFriendsPendingInvitations
}