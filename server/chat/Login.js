const uuid = require('uuid');

exports.LoginUser = (connectedUsers) => {
  return (user, setUser) => {
    if (isUser(connectedUsers, user)) {
      setUser({
        isUser: true,
        user: ''
      });
    } else {
      setUser({
        isUser: false,
        user: createLogin({name: user})
      });
    }
  }
};

const isUser = (userList, user) => {
  return user in userList;
};

const createLogin = ({name = "", socketId=null}) => {
  return {
    id: uuid(),
    name,
    socketId,
  };
};