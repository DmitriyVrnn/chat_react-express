const { io } = require('./server.js');

const Room = require('./models/Room');

const { signIn, addUserToList, removeUserFromList } = require('./chat/Login');
const { sendMessageToChat } = require('./chat/MessageManager');

// События для socket
const {
  LOGIN, USER_CONNECTED, USER_DISCONNECT, LOGOUT_USER,
  CREATE_CHATS, MESSAGE_SEND, MESSAGE_RECIEVED,
} = require('./events');

let onlineUsers = {};

// Комнаты по умолчанию
const defaultRoom = [Room.createChat({ name: 'General' }),
  Room.createChat({ name: 'Games' }),
  Room.createChat({ name: 'Movies' }),
  Room.createChat({ name: 'Обсуждения' })].reverse();

module.exports = (socket) => {
  let sendMessageToChatFromUser;

  socket.on(LOGIN, signIn(onlineUsers));

  socket.on(USER_CONNECTED, (user) => {
    // Добавляем в онлайн список пользователя, который приконнектился
    onlineUsers = addUserToList(onlineUsers, user);
    socket.user = user;
    // Добавляем в список сообщений, отправленное пользователем сообщение
    sendMessageToChatFromUser = sendMessageToChat(MESSAGE_RECIEVED, user.name);
    io.emit(USER_CONNECTED, onlineUsers);
  });

  //Выход из аккаунта после перезагрузки страницы
  socket.on('disconnect', () => {
    if ('user' in socket) {
      onlineUsers = removeUserFromList(onlineUsers, socket.user.name);
      io.emit(USER_DISCONNECT, onlineUsers);
    }
  });

  socket.on(LOGOUT_USER, () => {
    if ('user' in socket) {
      onlineUsers = removeUserFromList(onlineUsers, socket.user.name);
      io.emit(USER_DISCONNECT, onlineUsers);
    }
  });

  // Отправляем комнаты по умолчанию
  socket.on(CREATE_CHATS, (callback) => {
    callback(defaultRoom);
  });

  // Отправка сообщений
  socket.on(MESSAGE_SEND, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });
};
