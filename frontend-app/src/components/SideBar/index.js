import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import RoomList from '../RoomList';

import './styles.css';

const SideBar = ({
  chats, activeChats, user, setActiveChat, logout,
}) => (
  <>
    <input type="checkbox" id="hmt" className="hidden-menu-ticker" />
    <label className="btn-menu" htmlFor="hmt">
      <span className="first" />
      <span className="second" />
      <span className="third" />
    </label>
    <div className="sidebar">
      <RoomList
        chats={chats}
        activeChats={activeChats}
        setActiveChat={setActiveChat}
      />
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
  </>
);

export default SideBar;

SideBar.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeChats: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setActiveChat: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  activeChats: null,
};
