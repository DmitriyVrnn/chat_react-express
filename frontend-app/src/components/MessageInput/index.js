import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './styles.css';

export default class MessageInput extends React.Component {
  state = {
    message: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.sendMessage();
    this.setState({ message: '' });
  };

  sendMessage = () => {
    const { sendMessage } = this.props;
    const { message } = this.state;
    if (message.trim()) {
      sendMessage(message);
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div className="message-input">
        <form className="form-input" onSubmit={this.handleSubmit}>
          <TextField
            className="text-field"
            type="text"
            value={message}
            placeholder="Напишите ваше сообщение"
            onKeyUp={e => e.key === 'Enter'}
            onChange={({ target }) => {
              this.setState({ message: target.value });
            }}
          />
          <Button type="submit" variant="contained" color="primary" className="btn-send">
            <Icon><i className="fas fa-paper-plane" /></Icon>
            <span className="send-title">Отправить</span>
          </Button>
        </form>
      </div>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
