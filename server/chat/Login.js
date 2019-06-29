const User = require('../models/User');

signIn = (connectedUsers) => {
  return (user, setUser) => {
    if (isUser(connectedUsers, user)) {
      setUser({
        isUser: true,
        user: ''
      });
    } else {
      setUser({
        isUser: false,
        user: User.createUser({name: user})
      });
    }
  }
};

const isUser = (userList, user) => {
  return user in userList;
};

module.exports = {
  signIn,
};