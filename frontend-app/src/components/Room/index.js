import React from 'react';
import PropTypes from 'prop-types';
import {
  Link, BrowserRouter as Router,
} from 'react-router-dom';

import './styles.css';

const Room = ({
  name, active, setActiveChat, id,
}) => (
  <Router>
    <Link
      to={`${id}`}
      className={active ? 'active' : 'room-name'}
      onClick={setActiveChat}
    >
      <span>{`#${name}`}</span>
    </Link>
  </Router>
);
export default Room;


Room.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  setActiveChat: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Room.defaultProps = {
  active: false,
};
