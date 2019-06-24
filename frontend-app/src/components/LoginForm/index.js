import React, {Component} from 'react';

export default class LoginForm extends Component {
  state = {
    login: '',
  };

  handleInputChange = (e) => {
    this.setState({login: e.target.value})
  };

  handleSubmit = (e, { socket }) => {
    e.preventDefault();
    socket.emit()
  };

  render() {
    const {login} = this.state;
    return (
        <>
          <form action="">
            <label> Input your nickname
              <input type="text" value={login} onChange={this.handleInputChange} required/>
            </label>
          </form>
        </>
    )
  }
};