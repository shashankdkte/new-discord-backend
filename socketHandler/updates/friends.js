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

const updateFriends = async (userId) => {
  try
  {
    //find active connection of specific id (online users)
    const receiverList = serverStore.getActiveConnections(userId);
    //console.log("receiverList -> ",receiverList);
    if (receiverList.length > 0)
    {
      
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends", "_id username mail"
      )
      //  console.log("user -> ",user);
      if (user)
      {
        const friendList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username:f.username
          }
        })
       // console.log("friendList -> ",friendList);
        //get io server instance
        const io = serverStore.getSocketInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friend-list", {
            friends:friendList?friendList:[]
          })
        })
        }
      }
    
  }
  catch (error)
  {
    console.log(error)
  }
}

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends
}