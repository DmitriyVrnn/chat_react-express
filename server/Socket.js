//think
const io = require('./server.js').io
const uuid = require('uuid');

//const {LoginUser} = require('./chat/Login')

const {LOGIN, USER_CONNECTED, USER_DISCONNECT, LOGOUT_USER, COMMUNITY_CHAT, MESSAGE_SEND, MESSAGE_RECIEVED} = require('./contants');

let connectedUsers = {};

const createChat = ({messages = [], name = "", users = []} = {}) => (
    {
      id: uuid(),
      name,
      messages,
      users,
    }
);

let communityChat = {firstChat: createChat({messages: [], name: "Test", users: []}), secondChat: createChat({messages: [], name: "Test2", users: []})};
//console.log('CHAT', communityChat)

module.exports = (socket) => {
  //socket.on(LOGIN, LoginUser(connectedUsers));

  let sendMessageToChatFromUser;

  //Вход
  socket.on(LOGIN, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({isUser: true, user: null})
    } else {
      callback({isUser: false, user: createUser({name: nickname})})
    }
  })

  //Добавить пользователя при коннекте в объект
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    sendMessageToChatFromUser = sendMessageToChat(user.name)
    io.emit(USER_CONNECTED, connectedUsers);
  });

  //Выход из аккаунта после перезагрузки страницы
  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name)
      io.emit(USER_DISCONNECT, connectedUsers)
    }
  })

  //Выход
  socket.on(LOGOUT_USER, () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name)
      io.emit(USER_DISCONNECT, connectedUsers)
    }
  })

  //Общая комната
  socket.on(COMMUNITY_CHAT, (callback) => {
    console.log(communityChat)
    callback(communityChat)
  });

  socket.on(MESSAGE_SEND, ({chatId, message}) => {
    sendMessageToChatFromUser(chatId, message)
  })

};

const isUser = (userList, username) => {
  return username in userList;
};

//Отправка сообщений
const sendMessageToChat = (sender) => {
  return (chatId, message) => {
    io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
  }
};

const createUser = ({name = ""}) => {
  return {
    id: uuid(),
    name,
  };
};

const addUser = (userList, user) => {
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
};

const removeUser = (userList, username) => {
  let newList = Object.assign({}, userList);
  delete newList[username];
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