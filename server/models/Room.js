const uuid = require('uuid');

const createChat = ({ messages = [], name = '', users = [] } = {}) => (
  {
    id: uuid(),
    name,
    messages,
    users,
  }
);

module.exports = {
  createChat,
};
