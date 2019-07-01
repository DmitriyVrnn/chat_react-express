import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import LoginForm from '../LoginForm';
import ChatContainer from '../ChatContainer';

import { USER_CONNECTED, CONNECTION_PORT, LOGOUT_USER } from '../../constants';

import './styles.css';

class EntranceController extends Component {
  state = {
    socket: null,
    user: null,
  };

  componentWillMount() {
    const socket = socketIOClient(CONNECTION_PORT);
    const { user } = this.state;
    if (user) {
      this.reconnect(socket);
    } else {
      console.log('connected');
    }
    this.setState({ socket });
  }

  setUserToChat = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT_USER);
    this.setState({ user: null });
  };

  render() {
    const { socket, user } = this.state;
    return (
      <section className="container-login">
        {user
          ? (
            <ChatContainer
              user={user}
              logout={this.logout}
              socket={socket}
            />
          )
          : (
            <LoginForm
              socket={socket}
              setUserToChat={this.setUserToChat}
            />
          )
          }
      </section>
    );
  }
}

export default EntranceController;
