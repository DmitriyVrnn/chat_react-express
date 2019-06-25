const uuid = require('uuid');

module.exports = (connectedUsers) => {
  return (userName, setUser) => {
    if (isUser(connectedUsers, userName)) {
      console.log(`LOGIN ${Object.keys(connectedUsers)}`)
      setUser({
        isUser: true,
        userName: ''
      });
    } else {
      setUser({
        isUser: false,
        userName: createLogin({name: userName})
      });
    }
    console.log(`data ${userName}`);
  }
};

const isUser = (userList, userName) => {
  console.log(`userList - ${userName}`);
  return userName in userList;
};

const createLogin = ({name = ""} = {}) => {
  console.log(`name - ${name}`);
  return {
    id: uuid(),
    name,
  };
};