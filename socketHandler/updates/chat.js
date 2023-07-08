const Conversation = require("../../models/conversation")
const serverStore = require("../../serverStore")

const updateChatHistory = async(converationId, toSpecificSockeId = null) =>
{
  const conversation = await Conversation.findById(converationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "User",
      select:"username _id"
    }
  })
  


  if (conversation)
  {
    const io = serverStore.getSocketInstance();
    if (toSpecificSockeId)
    {
      //intial Update chat History
      return io.to(toSpecificSockeId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants:conversation.participants
      })
    }
    
    //check id users of this conversation are online
    //if yes emit to them update of messages

    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(userId.toString());

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants:conversation.participants
        })
      })
    })
    }
}

module.exports = { updateChatHistory}