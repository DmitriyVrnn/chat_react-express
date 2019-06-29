import React, {Component} from 'react';
import Room from '../Room';

import './styles.css'

export default class RoomContainer extends Component {

  createArrayFromObject(object) {
    return object == null ? [] : this.values(object, Object.keys(object))
  }

  values(object, keys) {
    return keys == null ? [] : keys.map((key) => object[key])
  }

  render() {
    const {chats, activeChats, user, setActiveChat, logout} = this.props
    console.log('ЧАТЫ', chats)
    return (
        <div className="container-room">
          <div
              className="users"
              ref='users'
              onClick={(e) => {
                (e.target === this.refs.user) && activeChats(null)
              }}>

            {
              chats.map((chat) => {
                console.log('Что в чате', Object.values(chat))
                //let newChat = this.createArrayFromObject(chat)
                // return chat.map(item => {
                //
                if (activeChats) {
                  // console.log('Сраневние', activeChats, chat.id)
                  return Object.values(chat).map(item => {
                    console.log('active ID', activeChats.id)
                    return (
                        <Room key={item.id}
                              name={item.name}
                              active={activeChats.id === item.id}
                              setActiveChat={() => setActiveChat(item)}
                        />
                    )
                  })
                } else {
                  return (<h1>Ну чет так се</h1>)
                }
              })
            }
          </div>
          <div className="current-user">
            <span>{user.name}</span>
            <div onClick={() => {
              logout()
            }} title="Logout" className="logout">
              Выйти
            </div>
          </div>
        </div>
    );

  }
}

