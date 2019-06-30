import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ChatHeading = ({ name }) => (
  <div className="header">
    <h1 className="title-room">
        Комната
      {` #${name}`}
    </h1>
  </div>
);
export default ChatHeading;

ChatHeading.defaultProps = {
  name: '',
};

ChatHeading.propTypes = {
  name: PropTypes.string,
};
