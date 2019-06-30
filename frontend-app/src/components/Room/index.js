import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

const Room = ({
  name, active, setActiveChat, id,
}) => {
  //ПОДУМАТЬ
  console.log(id);
  return (
    <Link
      to={`${id}`}
      className={active ? 'active' : ''}
      onClick={setActiveChat}
    >
      <span>{name}</span>
    </Link>
  );
};


export default Room;

Room.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  setActiveChat: PropTypes.func.isRequired,
};

Room.defaultProps = {
  active: false,
};
