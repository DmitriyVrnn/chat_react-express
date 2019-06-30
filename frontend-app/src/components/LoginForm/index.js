import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LOGIN } from '../../constants';

export default class LoginForm extends Component {
  state = {
    user: '',
  };

  setUser = ({ user, isUser }) => {
    const { setUser } = this.props;
    if (isUser) {
      console.log(`err ${isUser}`);
    } else {
      setUser(user);
    }
  };

  handleInputChange = (e) => {
    this.setState({ user: e.target.value });
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
    const { user } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
              Введите свой логин
            <input
              type="text"
              value={user}
              onChange={this.handleInputChange}
              required
            />
          </label>
        </form>
      </>
    );
  }
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
};
