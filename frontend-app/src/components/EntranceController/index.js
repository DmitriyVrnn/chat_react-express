import React, {Component} from 'react'
import io from 'socket.io-client'

import LoginForm from '../LoginForm'

class EntranceController extends Component {
  state = {
    socket: null,
  };

  componentWillMount() {
    this.connectSocket()
  };

  connectSocket = () => {
    const { socket } = this.state;
    if (!socket) {
      const socket = io(':8080');
      socket.on('connect', (msg) => {
        console.log(`connected ${msg}`)
      });
      this.setState({socket})
    }
  };

  render() {
    const { socket } = this.state;
    return (
        <LoginForm socket={socket}/>
    )
  }
}

export default EntranceController;