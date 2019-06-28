import React from 'react'
import './styles.css'

export default class Room extends React.Component{
    render(){
      const {name, active, setActiveChat} = this.props
      return(
          <div className={active ? 'active' : ''}
                onClick={setActiveChat}>
            <div>{name}</div>
          </div>
      )
    }
}