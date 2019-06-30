import React from 'react';
import PropTypes from 'prop-types';

const Messages = ({ messages }) => (
  <div className="thread-container">
    <div className="thread">
      {
            messages.map(mes => (
              <div
                key={mes.id}
              >
                <div className="time">{mes.time}</div>
                <div className="data">
                  <div className="message">{mes.message}</div>
                  <div className="name">{mes.sender}</div>
                </div>
              </div>

            ))
          }
    </div>
  </div>
);

export default Messages;

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};
