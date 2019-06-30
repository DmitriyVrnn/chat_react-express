import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    sendMessage(message);
  };

  render() {
    const { message } = this.state;
    return (
      <div className="message-block">
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
          <Button type="submit">
              Отправить
          </Button>
        </form>
      </div>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
