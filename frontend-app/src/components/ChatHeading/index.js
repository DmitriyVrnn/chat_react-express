import React from 'react'
import './styles.css'

export default class ChatHeading extends React.Component {
  render() {
    const {name} = this.props;
    return (
        <div className="header">
          <h1 className="title-room">Chat {name}</h1>
        </div>
    )
  }
}