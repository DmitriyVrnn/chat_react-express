import React, {Component} from 'react';

import RoomContainer from '../RoomContainer'
import UserList from '../UserList'
import ChatHeading from '../ChatHeading'
import Messages from '../Messages'
import MessageInput from '../MessageInput'

import './styles.css'

import {
  USER_CONNECTED,
  USER_DISCONNECT,
  MESSAGE_SEND,
  COMMUNITY_CHAT,
  MESSAGE_RECIEVED,
} from "../../constants";

export default class ChatForm extends Component {
  state = {
    users: [],
    chats: [],
    activeChat: null,
  };

  componentDidMount() {
    const {socket} = this.props;
    this.initSocket(socket)
  }

  componentWillUnmount() {
    const {socket} = this.props;
    socket.off(USER_CONNECTED);
    socket.off(USER_DISCONNECT);
    socket.off(COMMUNITY_CHAT);
  }

  resetChat = (chat) => {
    return this.addChat(chat, true)
  };

  addChat(chat, reset) {
    const {socket} = this.props
    const {chats, activeChat} = this.state
    const newChats = reset ? [chat] : [...chats, chat]
    return chat.map(item => {
      this.setState({
        chats: newChats,
        activeChat: reset ? item : null
      });
      const messageEvent = `${MESSAGE_RECIEVED}-${item.id}`
      socket.on(messageEvent, this.addMessageToChat(item.id))
    })
  }

  addMessageToChat = (chatId) => {
    return message => {
      const {chats} = this.state
      let newChats = chats.map((chat) => {
        return Object.values(chat).map(chat => {
          if (chat.id === chatId)
            chat.messages.push(message)
          return chat
        })
      })
      this.setState({chats: newChats})
    }
  }

  setActiveChats = (activeChat) => {
    this.setState({activeChat})
  };

  sendMessage = (chatId, message) => {
    const {socket} = this.props
    console.log('чатид', chatId, message)
    socket.emit(MESSAGE_SEND, {chatId, message})
  }

  initSocket(socket) {
    socket.on(USER_CONNECTED, (users) => {
      const listUsers = this.createArrayFromObject(users);
      this.setState({users: listUsers})
    });
    socket.on(USER_DISCONNECT, (users) => {
      console.log('DISCONNECT', (users))
    });

    socket.emit(COMMUNITY_CHAT, this.resetChat)

    //socket.emit(COMMUNITY_CHAT, this.resetChat)
  }

  createArrayFromObject(object) {
    return object == null ? [] : this.values(object, Object.keys(object))
  }

  values(object, keys) {
    return keys == null ? [] : keys.map((key) => object[key])
  }

  render() {
    const {user, logout} = this.props;
    const {users, chats, activeChat} = this.state
    console.log('Активный чат', activeChat)
    return (
        <div className="container">
          <RoomContainer user={user}
                         logout={logout}
                         chats={chats}
                         activeChats={activeChat}
                         setActiveChat={this.setActiveChats}/>
          {
            activeChat !== null ? (
                    <div className="message-container">
                      <ChatHeading name={activeChat.name}/>
                      <Messages messages={activeChat.messages}
                                user={user}/>
                      <MessageInput sendMessage={(message) => {
                        this.sendMessage(activeChat.id, message)
                      }}/>
                    </div>)
                :
                <div>
                  <h3>Choose a chat!</h3>
                </div>
          }

          <UserList users={users}/>
        </div>
    )
  }
}