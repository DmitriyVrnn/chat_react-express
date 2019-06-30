const userInst = require('../models/User');

const isUser = (userList, user) => user in userList;

const signIn = connectedUsers => (user, setUser) => {
  if (isUser(connectedUsers, user)) {
    setUser({
      isUser: true,
      user: '',
    });
  } else {
    setUser({
      isUser: false,
      user: userInst.createUser({ name: user }),
    });
  }
};

const addUserToList = (userList, user) => {
  const newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
};

const removeUserFromList = (userList, username) => {
  const newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
};

module.exports = {
  signIn,
  addUserToList,
  removeUserFromList,
};
