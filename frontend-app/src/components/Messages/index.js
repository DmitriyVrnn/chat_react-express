import React from 'react'

export default class Messages extends React.Component {
  render() {
    const {messages} = this.props
    console.log('ЧЕ ТУТ', messages)
    return (
        <div className="thread-container">
          <div className="thread">
            {
              messages.map((mes) => {
                return (
                    <div
                        key={mes.id}
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