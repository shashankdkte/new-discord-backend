const Conversation = require("../models/conversation");
const Message = require("../models/message")
const chatUpdates = require("./updates/chat")
const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event is being handled");

    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    //create new Message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type:"DIRECT"
    })


    //find if conversation exist
    const conversation = await Conversation.findOne({
      participants:{$all:[userId,receiverUserId]}
    })

    //if exist
    if (conversation)
    {
      conversation.messages.push(message._id);
      await conversation.save();
      
      //perform and update to sender and receiver if online
      chatUpdates.updateChatHistory(conversation._id.toString())
    }
    //if new conversation
    else
    {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants:[userId,receiverUserId]
      })
      // perform and update to sender and receiver if is online
      chatUpdates.updateChatHistory(newConversation._id.toString())
      
    }
    
  } catch (error) {
        console.log(err);
  }
}

module.exports = directMessageHandler