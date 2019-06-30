const uuid = require('uuid');

const createUser = ({ name = "" }) => {
  return {
    id: uuid(),
    name,
  };
};

module.exports = {
  createUser,
};