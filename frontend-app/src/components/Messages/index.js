import React from 'react'

export default class Messages extends React.Component {
  render() {
    const {messages, user} = this.props
    console.log('Messages', messages)
    return (
        <div className="thread-container">
          <div className="thread">
            {
              messages.map((mes) => {
                console.log("MES", mes)
                return (
                    <div
                        key={mes.id}
                        className={`message-container ${mes.sender === user.name && 'right'}`}
                    >
                      <div className="time">{mes.time}</div>
                      <div className="data">
                        <div className="message">{mes.message}</div>
                        <div className="name">{mes.sender}</div>
                      </div>
                    </div>

                )
              })
            }
          </div>
        </div>
    );
  }
}