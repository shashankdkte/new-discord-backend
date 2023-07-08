const connectedUsers = new Map();
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

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketInstance,
  setSocketInstance
}