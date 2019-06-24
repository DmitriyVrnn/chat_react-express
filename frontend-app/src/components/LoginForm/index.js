import React, {Component} from 'react';
import {AUTH_USER} from "../../constants";

export default class LoginForm extends Component {
  state = {
    login: '',
  };

  setUser = (user, isUser) => {
    console.log(user, isUser);
    const {setUser} = this.props;
    if (isUser) {
      console.log(`err ${isUser}`)
    } else {
      setUser(user);
    }
  };

  handleInputChange = (e) => {
    this.setState({login: e.target.value})
  };

  handleSubmit = (e) => {
    const {socket} = this.props;
    const {login} = this.state;
    e.preventDefault();
    if (login.trim()) {
      socket.emit(AUTH_USER, login, this.setUser);
    }
  };

  render() {
    const {login} = this.state;
    return (
        <>
          <form onSubmit={this.handleSubmit}>
            <label> Input your nickname
              <input
                  type="text"
                  value={login}
                  onChange={this.handleInputChange}
                  required/>
            </label>
          </form>
        </>
    )
  }
};