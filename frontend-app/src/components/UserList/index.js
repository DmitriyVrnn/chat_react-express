import React, { Component } from 'react';
import './styles.css'

class UserList extends Component {
  render() {
    const {users} = this.props
    return (
        <div className='user-list-container'>
          <h3 className='user-list-title'>Онлайн</h3>
          <ul className='user-list'>
            {users.map((user) => {
              return(
                <li className='user-list-item' key={user.id}>{user.name}</li>)
            })}
          </ul>
        </div>
    );
  }
}

export default UserList;