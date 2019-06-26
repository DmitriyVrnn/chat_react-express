import React, {Component} from 'react';
import RoomContainer from '../RoomContainer'
import MessageContainer from '../MessageContainer'
import UserList from '../UserList'

import './styles.css'
import {USER_CONNECTED, LOGOUT_USER} from "../../constants";

export default class ChatForm extends Component {
  state = {
    users: [],
    messages: [],
  };

  componentDidMount() {
    const {socket} = this.props;
    this.initSocket(socket)
  }

  componentDidUpdate() {
    const {socket} = this.props
    socket.emit(LOGOUT_USER)
  }


  initSocket(socket) {
    socket.on(USER_CONNECTED, (users) => {
      const listUsers = this.createArrayFromObject(users);
      this.setState({users: listUsers})
    })
  }

  createArrayFromObject(object) {
    return object == null ? [] : this.values(object, Object.keys(object))
  }

  values(object, keys) {
    return keys == null ? [] : keys.map((key) => object[key])
  }

  componentWillUnmount() {
    const {socket} = this.props;
    socket.off(USER_CONNECTED);
  }

  render() {
    const {user, logout} = this.props;
    const {users} = this.state
    return (
        <section className="container">
          <RoomContainer user={user} logout={logout}/>
          <MessageContainer/>
          <UserList users={users}/>
        </section>
    )
  }
}