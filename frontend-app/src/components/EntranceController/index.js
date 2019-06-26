import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'

import LoginForm from '../LoginForm'
import ChatForm from '../ChatForm'
import {USER_CONNECTED, CONNECTION_PORT, LOGOUT_USER} from '../../constants/';

class EntranceController extends Component {
  state = {
    socket: null,
    user: null,
  };

  componentWillMount() {
    const socket = socketIOClient(CONNECTION_PORT);
    if (this.state.user) {
      this.reconnect(socket)
    } else {
      console.log("connected")
    }
    this.setState({socket})
  };

  //action
  setUser = (user) => {
    const {socket} = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({user});
  };

  //action
  logout = () => {
    const {socket} = this.state;
    socket.emit(LOGOUT_USER);
    this.setState({user: null})
  };

  render() {
    const {socket, user} = this.state;
    return (
        <section>
          {user ?
              <ChatForm user={user}
                        logout={this.logout}
                        socket={socket}/>
              : <LoginForm socket={socket}
                           setUser={this.setUser}/>
          }
        </section>
    )
  }
}

export default EntranceController;