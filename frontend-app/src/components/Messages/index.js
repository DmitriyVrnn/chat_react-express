import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });
  return (
    <div className="message-block">
      <div className="thread-container">
        <div className="thread">
          {
              messages.map(mes => (
                <div
                  className="message-wrapper"
                  key={mes.id}
                >
                  <div className="time">{mes.time}</div>
                  <div className="data">
                    <div className="name">{mes.sender}</div>
                    <div className="message">{mes.message}</div>
                  </div>
                </div>
              ))
            }
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Messages;

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
