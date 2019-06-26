import React, { Component } from 'react';

class UserList extends Component {
  render() {
    const {users} = this.props
    console.log(users)
    return (
        <div className='user-list'>
          <h3 className='user-list__header'>Список подключенных пользователей:</h3>
          <ul className='user-list__list'>
            {users.map((user) => {
              console.log(`Ar ${user}`)
              return(
                <span className='user-list__item' key={user.id}>{user.name}</span>)
            })}
          </ul>
        </div>
    );
  }
}

export default UserList;