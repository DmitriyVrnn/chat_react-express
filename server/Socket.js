//think
const io = require('./server.js').io
const uuid = require('uuid');

const Login = require('./chat/Login');

const USER_CONNECTED = 'USER_CONNECTED';
const USER_DISCONNECT = 'USER_DISCONNECT';
const LOGIN = 'LOGIN';
const SEND_MESSAGE = 'SEND_MESSAGE';
const LOGOUT_USER = 'LOGOUT_USER ';

let connectedUsers = {};

module.exports = (socket) => {
  console.log(`Socket id: ${socket.id}`);
  socket.on(LOGIN, Login(connectedUsers));

  socket.on(USER_CONNECTED, (user)=>{
    user.socketId = socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    //console.log(JSON.stringify(user))
    //console.log(JSON.stringify(user))

    /*sendMessageToChatFromUser = sendMessageToChat(user.name)
    sendTypingFromUser = sendTypingToChat(user.name)*/

    io.emit(USER_CONNECTED, connectedUsers);
  });

  socket.on(LOGOUT_USER, () => {
    connectedUsers = removeUser(connectedUsers, socket.name)
    //think
    io.emit(LOGOUT_USER, connectedUsers);
    console.log(connectedUsers)
  })
};

const addUser = (userList, user) => {
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
};

const removeUser = (userList, userName) => {
  let newList = Object.assign({}, userList);
  delete newList[userName];
  return newList
};

const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
};

const createMessage = ({message = "", sender = ""} = {}) => {
  return {
    id: uuid(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  }
};