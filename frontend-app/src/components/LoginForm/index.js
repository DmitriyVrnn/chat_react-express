import React, {Component} from 'react';
import {LOGIN} from '../../constants'

export default class LoginForm extends Component {
  state = {
    user: '',
  };

  setUser = ({user, isUser}) => {
    const {setUser} = this.props;
    if (isUser) {
      console.log(`err ${isUser}`)
    } else {
      setUser(user);
    }
  };

  handleInputChange = (e) => {
    this.setState({user: e.target.value})
  };

  handleSubmit = (e) => {
    const {socket} = this.props;
    const {user} = this.state;
    e.preventDefault();
    if (user.trim()) {
      socket.emit(LOGIN, user, this.setUser);
    }
  };

  render() {
    const {user} = this.state;
    return (
        <>
          <form onSubmit={this.handleSubmit}>
            <label> Input your nickname
              <input
                  type="text"
                  value={user}
                  onChange={this.handleInputChange}
                  required/>
            </label>
          </form>
        </>
    )
  }
};