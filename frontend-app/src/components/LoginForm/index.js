import React, {Component} from 'react';
import {LOGIN} from "../../constants";

export default class LoginForm extends Component {
  state = {
    userName: '',
  };

  setUser = ({userName, isUser}) => {
    console.log(userName, isUser);
    const {setUser} = this.props;
    if (isUser) {
      console.log(`err ${isUser}`)
    } else {
      setUser(userName);
    }
  };

  handleInputChange = (e) => {
    this.setState({userName: e.target.value})
  };

  handleSubmit = (e) => {
    const {socket} = this.props;
    const {userName} = this.state;
    e.preventDefault();
    if (userName.trim()) {
      socket.emit(LOGIN, userName, this.setUser);
    }
  };

  render() {
    const {userName} = this.state;
    return (
        <>
          <form onSubmit={this.handleSubmit}>
            <label> Input your nickname
              <input
                  type="text"
                  value={userName}
                  onChange={this.handleInputChange}
                  required/>
            </label>
          </form>
        </>
    )
  }
};