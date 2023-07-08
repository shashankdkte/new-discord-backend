
const FriendInvitation = require("../../models/friendInvitaiton");
const User = require("../../models/user");
const friendUpdates = require("../../socketHandler/updates/friends")
const postAccept = async(req, res) => {
 try {
  
   const { id } = req.body;
   const invitation = await FriendInvitation.findById(id);

   if (!invitation)
   {
     return res.status(401).send("Error occurred. Please try again");
   }
   const { senderId, receiverId } = invitation;
   //console.log("senderId ->",senderId)
   //console.log("receiverId ->",receiverId)

   //add friends to both user
   const senderUser = await User.findById(senderId);
   senderUser.friends = [...senderUser.friends, receiverId];
   //console.log("senderUser -> ",senderUser);
   
   
   const receiverUser = await User.findById(receiverId);
   receiverUser.friends = [...receiverUser.friends, senderId];
   //console.log("receiverUser -> ", receiverUser);
   
   await senderUser.save();
   await receiverUser.save();
   //delete invitation
   await FriendInvitation.findByIdAndDelete(id);

   //update friendlist for both
   friendUpdates.updateFriends(senderId.toString());
   friendUpdates.updateFriends(receiverId.toString());

   //update list of pending invitations
   friendUpdates.updateFriendsPendingInvitations(receiverId.toString());
     return res.status(200).send("Friend successfuly added");
 } catch (error) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again");
 }
}

module.exports = postAccept