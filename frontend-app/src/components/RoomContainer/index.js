import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Room from '../Room';

import './styles.css';

const RoomContainer = ({
  chats, activeChats, user, setActiveChat, logout,
}) => (
  <div className="room-container">
    <ul className="list-rooms">
      {
          chats.map((chat) => {
            if (activeChats) {
              return Object.values(chat).map(item => (
                <li
                  className="items"
                  key={item.id}
                >
                  <Room
                    activeChats={activeChats}
                    id={item.id}
                    name={item.name}
                    active={activeChats.id === item.id}
                    setActiveChat={() => setActiveChat(item)}
                  />
                </li>
              ));
            }
            return (<h1>Активные комнаты отсутствуют</h1>);
          })
        }
    </ul>
    <div className="current-user">
      <span className="block-info user-name-info">{user.name}</span>
      <Button
        variant="outlined"
        color="inherit"
        type="button"
        onClick={() => {
          logout();
        }}
        title="Logout"
        className="block-info btn-logout"
      >
        Выход
      </Button>
    </div>
  </div>
);

export default RoomContainer;

RoomContainer.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeChats: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setActiveChat: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

RoomContainer.defaultProps = {
  activeChats: null,
};
