const FriendInvitation = require("../../models/friendInvitaiton");
const User = require("../../models/user");


 const postInvite = async (req, res) => {
   const { targetMailAddress } = req.body;
   
   const { userId, mail } = req.user;

   //check fi friend that we would like to invite is not user
   if (mail.toLowerCase() === targetMailAddress.toLowerCase())
   {
     return res.status(409).send("Sorry , You cannot become friends with yourself");
   }
   const targetUser = await User.findOne({
     mail: targetMailAddress.toLowerCase()
   });

   if (!targetUser)
   {
     return  res.status(404).send(`Friend of ${targetMailAddress} has not been found. Please check mail address`);
   }

   //Check if email has already been sent

   const invitationAlreadyReceived = await FriendInvitation.findOne({
     senderId: userId,
     receiverId:targetUser._id
   })
   if (invitationAlreadyReceived)
   {
     return res.status(409).send("Invitation has already been sent");
   }

   //check if user already friend
   const userAlreadyFriends = targetUser.friends.find(
     (friendId) => friendId.toString === userId.toString()
   )

   if (userAlreadyFriends)
   {
     return res.status(409).send("Friends already added. Please check friend list")
   }
   
   //Create new Invitation in Database
   const newInvitation = await FriendInvitation.create({
     senderId: userId,
     receiverId:targetUser._id
   })

   //Update Friends Invitations
  return res.status(201).send("Invitations has been sent")
}

module.exports = postInvite