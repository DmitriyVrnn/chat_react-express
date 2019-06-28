import React, {Component} from 'react';
import RoomList from '../RoomList'

import {last, get, differenceBy} from 'lodash'
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
    console.log('room', chats)
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
                let newChat = this.createArrayFromObject(chat)
                //console.log('ЕЩЕ РАЗ', newChat.map(item => item.name))
                return (
                    <RoomList key={this.createArrayFromObject(chat.id)}
                              name={newChat.map(item => item.name)}
                              active={this.createArrayFromObject(activeChats.id) === this.createArrayFromObject(chat.id)}
                              setActiveChat={() => setActiveChat(chat)}/>
                )
                /*if (chat.name) {
                  const user = chat.users.find(({name}) => {
                    return name !== this.props.name
                  }) || {name: ["General", "Man"]}*/

                /*return (
                    <div
                        key={chat.id}
                        onClick={() => {
                          setActiveChat(chat)
                        }}
                    >
                      <div className="user-info">
                        {console.log('user', user)}
                        <ul className="name">{user.name.map(item => <li>{item}</li>)}</ul>
                      </div>

                    </div>
                )
              }
              return null*/
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