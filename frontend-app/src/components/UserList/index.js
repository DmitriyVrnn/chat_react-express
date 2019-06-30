import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const UserList = ({ users }) => (
  <div className="user-list-container">
    <h3 className="user-list-title">Онлайн</h3>
    <ul className="user-list">
      {users.map(user => (
        <li className="user-list-item" key={user.id}>{user.name}</li>))}
    </ul>
  </div>
);

export default UserList;

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
};
