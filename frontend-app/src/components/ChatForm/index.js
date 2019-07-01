import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoomContainer from '../RoomContainer';
import UserList from '../UserList';
import ChatHeading from '../ChatHeading';
import Messages from '../Messages';
import MessageInput from '../MessageInput';
import { createArrayFromObject } from '../../utils';

import './styles.css';

import {
  USER_CONNECTED,
  USER_DISCONNECT,
  MESSAGE_SEND,
  CREATE_CHATS,
  MESSAGE_RECIEVED,
} from '../../constants';

export default class ChatForm extends Component {
  state = {
    users: [],
    chats: [],
    activeChat: null,
  };

  componentDidMount() {
    const { socket } = this.props;
    this.initializeSocket(socket);
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(USER_CONNECTED);
    socket.off(USER_DISCONNECT);
    socket.off(CREATE_CHATS);
  }

  initializeSocket = (socket) => {
    socket.on(USER_CONNECTED, (users) => {
      const arrayUsers = createArrayFromObject(users);
      this.setState({ users: arrayUsers });
    });
    socket.on(USER_DISCONNECT, (users) => {
      this.setState({ users: createArrayFromObject(users) });
    });
    socket.emit(CREATE_CHATS, this.resetChat);
  };

  resetChat = chat => this.addChat(chat, true);

  addChat = (chat, reset) => {
    const { socket } = this.props;
    const { chats } = this.state;
    const newChats = reset ? [chat] : [...chats, chat];
    return chat.map((item) => {
      this.setState({
        chats: newChats,
        activeChat: reset ? item : null,
      });
      const messageEvent = `${MESSAGE_RECIEVED}${item.id}`;
      socket.on(messageEvent, this.addMessageToChat(item.id));
      return item;
    });
  };

  addMessageToChat = chatId => (message) => {
    const { chats } = this.state;
    const newChats = chats.map(chat => Object.values(chat).map((chat) => {
      if (chat.id === chatId) {
        chat.messages.push(message);
      }
      return chat;
    }));
    this.setState({ chats: newChats });
  };

  changeActiveChats = (activeChat) => {
    this.setState({ activeChat });
  };

  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SEND, { chatId, message });
  };

  render() {
    const { user, logout } = this.props;
    const { users, chats, activeChat } = this.state;
    return (
      <div className="chat-container">
        <RoomContainer
          user={user}
          logout={logout}
          chats={chats}
          activeChats={activeChat}
          setActiveChat={this.changeActiveChats}
        />
        {
            activeChat !== null ? (
              <div className="message-container">
                <ChatHeading name={activeChat.name} />
                <Messages
                  messages={activeChat.messages}
                  user={user}
                />
                <MessageInput sendMessage={(message) => {
                  this.sendMessage(activeChat.id, message);
                }}
                />
              </div>
            )
              : (
                <div>
                  <h3>Войдите в чат</h3>
                </div>
              )
          }
        <UserList users={users} />
      </div>
    );
  }
}

ChatForm.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};
