import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const MessageHeading = ({ name }) => (
  <div className="header">
    <h1 className="title-room">
          Комната
      {` #${name}`}
    </h1>
  </div>
);
export default MessageHeading;

MessageHeading.defaultProps = {
  name: '',
};

MessageHeading.propTypes = {
  name: PropTypes.string,
};
