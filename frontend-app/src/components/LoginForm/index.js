import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { LOGIN } from '../../constants';

import './styles.css';

export default class LoginForm extends Component {
  state = {
    user: '',
    error: false,
  };

  getError = (error) => {
    this.setState({
      error,
    });
  };

  handleInputChange = (e) => {
    this.setState({ user: e.target.value });
  };

  setUser = ({ user, isUser }) => {
    const { setUserToChat } = this.props;
    if (isUser) {
      this.getError('Данный логин занят');
    } else {
      setUserToChat(user);
    }
  };

  handleSubmit = (e) => {
    const { socket } = this.props;
    const { user } = this.state;
    e.preventDefault();
    if (user.trim()) {
      socket.emit(LOGIN, user, this.setUser);
    }
  };

  render() {
    const { user, error } = this.state;
    return (
      <form
        className="login-form"
        onSubmit={this.handleSubmit}
      >
        <label>
          <p className="login-title">Логин</p>
          <TextField
            className="login-field"
            placeholder="Введите логин"
            type="text"
            value={user}
            onChange={this.handleInputChange}
            required
          />
          <p className="error-message">{error || null}</p>
        </label>
      </form>
    );
  }
}

LoginForm.propTypes = {
  setUserToChat: PropTypes.func.isRequired,
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
};
