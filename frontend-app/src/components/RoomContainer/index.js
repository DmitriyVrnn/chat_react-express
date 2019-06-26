import React from 'react';
import './styles.css'

export default class RoomContainer extends React.Component {
  render() {
    const {user, logout} = this.props;
    return (
        <div className="room-container">
          <div className="header">
            {user.name}
            <button onClick={() => logout()}>Выйти</button>
          </div>
        </div>
    )
  }
}