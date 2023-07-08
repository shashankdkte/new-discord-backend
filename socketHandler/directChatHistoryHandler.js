const conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat")

const directChatHistoryHandler = async (socket, data) => {
  try
  {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type:"DIRECT"
      
    })

    if (conversation)
    {
      chatUpdates.updateChatHistory(conversation._id.toString(),socket.id)
    
      }
  }
  catch (err)
  {
    console.log(err)
  }
}
module.exports = directChatHistoryHandler;