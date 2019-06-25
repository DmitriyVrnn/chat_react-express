//think
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const uuid = require('uuid');

const Login = require('./chat/Login');

const USER_CONNECTED = 'USER_CONNECTED';
const LOGIN = 'LOGIN';
const SEND_MESSAGE = 'SEND_MESSAGE';
const LOGOUT_USER = 'LOGOUT_USER ';

let connectedUsers = {};

module.exports = (socket) => {
  console.log(`Socket id: ${socket.id}`);
  socket.on(LOGIN, Login(connectedUsers));

  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers)

    /*sendMessageToChatFromUser = sendMessageToChat(user.name)
    sendTypingFromUser = sendTypingToChat(user.name)*/

  });

  socket.on(LOGOUT_USER, () => {
    let userList = removeUser(connectedUsers, socket.name)
    //think
    io.emit(LOGOUT_USER, Object.values(userList));
    console.log(`remove ${Object.values(userList)}`)
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