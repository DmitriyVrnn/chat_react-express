const io = require('socket.io');

const USER_CONNECTED = 'USER_CONNECTED';
const AUTH_USER = 'AUTH_USER';
const SEND_MESSAGE = 'SEND_MESSAGE';
const LOGOUT_USER = 'LOGOUT_USER ';

const createLogin = ({name = ""} = {}) => {
  console.log(`name - ${name}`);
  return {
    name,
  }
};

const connectedUser = {};

module.exports = (socket) => {
  console.log(`Socket id: ${socket.id}`);
  socket.on(AUTH_USER, (login, callback) => {
    if (isUser(connectedUser, login)) {
      callback({
        isUser: true,
        login: null
      });
    } else {
      callback({
        isUser: false,
        login: createLogin({name: login})
      });
    }
    console.log(login);
  })
};

const isUser = (userList, login) => {
  console.log(`userList - ${login}`);
  return login in userList;
};