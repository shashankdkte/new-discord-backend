const serverStore = require("../../serverStore");

const updateRooms = (toSpecificTargetId = null) => {
  const io = serverStore.getSocketInstance();
  const activeRooms = serverStore.getActiveRooms();



  if (toSpecificTargetId)
  {
    io.to(toSpecificTargetId).emit('active-rooms', {
      activeRooms,
    });
  }
  else
  {
    io.emit("active-rooms", {
      activeRooms
    })
    }

}

module.exports = {
  updateRooms
}