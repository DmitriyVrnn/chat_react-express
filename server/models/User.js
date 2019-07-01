const uuid = require('uuid');

const createUser = ({ name = '' }) => ({
  id: uuid(),
  name,
});

module.exports = {
  createUser,
};
