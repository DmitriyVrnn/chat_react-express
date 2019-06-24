import React from 'react';

const Chat = ({user}) => {
  return (
      <h1>Привет {user.login.name}</h1>
  )
};

export default Chat;