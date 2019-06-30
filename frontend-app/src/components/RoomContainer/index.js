import React from 'react';
import PropTypes from 'prop-types';

import Room from '../Room';

import './styles.css';

const RoomContainer = ({
  chats, activeChats, user, setActiveChat, logout,
}) => (
  <div className="container-room">
    <div
      className="users"
      onClick={(e) => {
        (e.target === user) && activeChats(null);
      }}
    >

      {
            chats.map((chat) => {
              if (activeChats) {
                return Object.values(chat).map((item) => {
                  console.log('active ID', activeChats.id);
                  return (
                    <Room
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      active={activeChats.id === item.id}
                      setActiveChat={() => setActiveChat(item)}
                    />
                  );
                });
              }
              return (<h1>Активные комнаты отсутствуют</h1>);
            })
          }
    </div>
    <div className="current-user">
      <span>{user.name}</span>
      <button
        type="button"
        onClick={() => {
          logout();
        }}
        title="Logout"
        className="logout"
      >
            Выйти
      </button>
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
