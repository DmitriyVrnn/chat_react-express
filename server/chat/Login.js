const userInst = require('../models/User');

const signIn = (connectedUsers) => {
  return (user, setUser) => {
    if (isUser(connectedUsers, user)) {
      setUser({
        isUser: true,
        user: ''
      });
    } else {
      setUser({
        isUser: false,
        user: userInst.createUser({name: user})
      });
    }
  }
};

const isUser = (userList, user) => {
  return user in userList;
};

const addUserToList = (userList, user) => {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList
};

const removeUserFromList = (userList, username) => {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList
};

module.exports = {
  signIn,
  addUserToList,
  removeUserFromList
};