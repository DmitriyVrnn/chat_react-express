import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const UserList = ({ users, userName }) => (
  <>
    <input type="checkbox" id="online-user" className="hidden-online-user" />
    <label className="btn-online" htmlFor="online-user"><i className="fas fa-chevron-down"></i></label>
    <div className="online-container">
      <h3 className="user-list-title">
В сети (
        {`${Object.keys(users).length}`}
)
      </h3>
      <ul className="user-list">
        {users.map(user => (
          <li
            className="user-list-item"
            key={user.id}
          >
            <div className="circle" />
            {`${user.name} ${user.name === userName.name ? '(Вы)' : ''}`}
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default UserList;

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  userName: PropTypes.objectOf(PropTypes.any).isRequired,
};
