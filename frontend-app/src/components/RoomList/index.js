import React from 'react';
import PropTypes from 'prop-types';

import Room from '../Room';

import './styles.css';

const RoomList = ({
  chats, activeChats, setActiveChat,
}) => (
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
);

export default RoomList;

RoomList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeChats: PropTypes.objectOf(PropTypes.any),
  setActiveChat: PropTypes.func.isRequired,
};

RoomList.defaultProps = {
  activeChats: null,
};
