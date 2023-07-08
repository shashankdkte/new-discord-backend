const authSocket = require("./middleware/authSocket");
const disconnectHandler = require("./socketHandler/disconnectHandler");
const newConnectionHandler = require("./socketHandler/newConnectionHandler");
const serverStore = require("./serverStore")

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  serverStore.setSocketInstance(io);
  io.use((socket, next) => {

    authSocket(socket,next)
  })

  io.on("connection", (socket) => {
    console.log("user connected");
    //console.log(socket.id);

    newConnectionHandler(socket, io)
    
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    })
  })
}


module.exports = {
  registerSocketServer
}