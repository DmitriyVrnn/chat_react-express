const { io } = require('../server');
const messageObj = require('../models/Message');

const sendMessageToChat = (event, sender) => (chatId, message) => {
  const messageEvent = `${event}${chatId}`;
  io.emit(messageEvent, messageObj.createMessage({ message, sender }));
};

module.exports = {
  sendMessageToChat,
};
