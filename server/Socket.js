const io = require('socket.io');

module.exports = (socket) => {
  console.log(`Socket id: ${socket.id}`)
};