const uuid = require('uuid')

const createMessage = ({message = "", sender = ""} = {}) => {
  return {
    id: uuid(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  }
};

const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
};

module.exports = {
  createMessage,
};