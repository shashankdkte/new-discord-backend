const FriendInvitation = require("../../models/friendInvitaiton");
const friendUpdates = require("../../socketHandler/updates/friends")

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    //remove that invitation
    const invitationExist = await FriendInvitation.exists({ _id: id });
    if (invitationExist)
    {
      await FriendInvitation.findByIdAndDelete(id);
    }
    
    //update pending invitation
    friendUpdates.updateFriendsPendingInvitations(userId)
    return res.status(200).send("Invitation successfully rejected")
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong please try again")
  }
 res.send("reject handler") 
}

module.exports = postReject