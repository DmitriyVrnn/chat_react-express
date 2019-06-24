import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'
import {CONNECTION_PORT, LOGOUT_USER, USER_CONNECTED} from "../../constants";

import LoginForm from '../LoginForm'

class EntranceController extends Component {
  state = {
    socket: null,
    user: '',
  };

  componentWillMount() {
    this.connectionSocket()
  };

  connectionSocket = () => {
    const {socket} = this.state;
    // think
    if (!socket) {
      const socket = socketIOClient(CONNECTION_PORT);
      socket.on('connect', () => {
        console.log(`connected ${socket.id}`)
      });
      this.setState({socket})
    }
  };

  //action
  setUser = (user) => {
    const {socket} = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({user});
  };

  //action
  logoutChat = () => {
    const {socket} = this.state;
    socket.emit(LOGOUT_USER);
    this.setState({user: ''})
  };

  render() {
    const {socket, user} = this.state;
    console.log(user);
    return (
        <section>
          {!user ?
              <LoginForm socket={socket}
                         setUser={this.setUser}/>
              : <h1>hello</h1>
          }
        </section>
    )
  }
}

export default EntranceController;