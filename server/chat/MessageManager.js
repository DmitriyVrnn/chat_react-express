const io = require('../server').io;
const messageObj = require('../models/Message');

const sendMessageToChat = (event, sender) => {
  return (chatId, message) => {
    const messageEvent = `${event}${chatId}`;
    io.emit(messageEvent, messageObj.createMessage({message, sender}));
  }
};

module.exports = {
  sendMessageToChat
};