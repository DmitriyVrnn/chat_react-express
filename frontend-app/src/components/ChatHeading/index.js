import React from 'react'

export default class ChatHeading extends React.Component{
  render(){
    const {name} = this.props
    return(
        <h1>Chat {name}</h1>
    )
  }
}