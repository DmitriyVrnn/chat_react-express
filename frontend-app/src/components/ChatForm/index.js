import React, {Component} from 'react';
import RoomContainer from '../RoomContainer'
import MessageContainer from '../MessageContainer'
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
  }

  resetChat = (chat) => {
    return this.addChat(chat, true)
  };

  addChat(chat, reset) {
    console.log(chat)
    const { socket } = this.props
    const { chats } = this.state

    const newChats = reset ? [chat] : [...chats, chat]
    this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
    socket.on(messageEvent, this.addMessageToChat(chat.id))
  }

  addMessageToChat = (chatId) => {
    return message => {
      const {chats} = this.state
      let newChats = chats.map((chat) => {
        if (chat.id === chatId)
          chat.messages.push(message)
        return chat
      })
      this.setState({chats: newChats})
    }
  }

  setActiveChats = (activeChat) => {
    this.setState({activeChat})
  };

  sendMessage = (chatId, message) => {
    const {socket} = this.props
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
    return (
        <section className="container">
          <RoomContainer user={user}
                         logout={logout}
                         chats={chats}
                         activeChats={activeChat}
                         setActiveChats={this.setActiveChats}/>
          {
            activeChat !== null ? (
                    <div className="message-container">
                      <ChatHeading name={activeChat.name}/>
                      <Messages messages={activeChat.messages}
                                user={user}/>
                      <MessageInput sendMessage={(message) => {
                        this.sendMessage(activeChat.id, message)
                        console.log(message)
                      }}/>
                    </div>
                ) :
                <div>
                  {console.log('активный', activeChat)}
                  <h3>Choose a chat!</h3>
                </div>
          }
          <UserList users={users}/>
        </section>
    )
  }
}