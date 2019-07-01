const uuid = require('uuid');

const getTime = date => `${date.getHours()}:${(`0${date.getMinutes()}`).slice(-2)}`;

const createMessage = ({ message = '', sender = '' } = {}) => ({
  id: uuid(),
  time: getTime(new Date(Date.now())),
  message,
  sender,
});

module.exports = {
  createMessage,
};
