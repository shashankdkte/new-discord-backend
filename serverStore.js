const {v4:uuidv4} = require("uuid")
const connectedUsers = new Map();
let activeRooms = []
let io = null;

const setSocketInstance = (ioInstance) => {
  io = ioInstance;
}

const getSocketInstance = () => {
  return io;
}
const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  //console.log("new connected Users");
  //console.log(connectedUsers);
}

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId))
  {
    connectedUsers.delete(socketId);
   // console.log("new connected users");
    //console.log(connectedUsers);
  }
}

const getActiveConnections = (userId) => {
  const activeConnections = [];
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId)
    {
      activeConnections.push(key);
    }
  });
  return activeConnections;
}


const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({socketId:key, userId:value.userId})
  })
  return onlineUsers
}


//rooms

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,socketId
    },
    participants: [{
      userId,socketId
    }],
    roomId:uuidv4(),
  }
  activeRooms = [...activeRooms, newActiveRoom]
  console.log(activeRooms)
  return newActiveRoom;
}
module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketInstance,
  setSocketInstance,
  getOnlineUsers,
  addNewActiveRoom,
}