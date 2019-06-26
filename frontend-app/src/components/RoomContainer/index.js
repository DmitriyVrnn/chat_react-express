import React, { Component } from 'react';
import SideBarOption from '../SideBarOption'
import { last, get, differenceBy } from 'lodash'
import './styles.css'

export default class SideBar extends Component{
  static type = {
    USERS:"users",
    CHATS:"chats"
  }
  constructor(props){
    super(props)
    this.state = {
      reciever:"",
      activeSideBar: SideBar.type.CHATS
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { reciever } = this.state
    const { onSendPrivateMessage } = this.props

    onSendPrivateMessage(reciever)
    this.setState({reciever:""})
  }

  addChatForUser = (reciever) => {
    this.props.onSendPrivateMessage(reciever)
    this.setActiveSideBar(SideBar.type.CHATS)
  }
  setActiveSideBar = (type) => {
    this.setState({ activeSideBar:type })
  }

  render(){
    const { chats, activeChat, user, setActiveChat, logout, users } = this.props
    const {activeSideBar } = this.state
    return (
        <div className="room-container">
          <div className="side-bar-select">
            <div
                onClick = { ()=>{ this.setActiveSideBar(SideBar.type.CHATS) } }
                className={`side-bar-select__option ${ activeSideBar === SideBar.type.CHATS ? 'active':''}`}>
              <span>Chats</span>
            </div>
            <div
                onClick = { ()=>{ this.setActiveSideBar(SideBar.type.USERS) } }
                className={`side-bar-select__option ${ activeSideBar === SideBar.type.USERS ? 'active':''}`}>
              <span>Users</span>
            </div>
          </div>
          <div
              className="users"
              ref='users'
              onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>

            {
              activeSideBar === SideBar.type.CHATS ?
                  chats.map((chat)=>{

                    return(
                        <SideBarOption
                            key = {chat.id}
                            lastMessage = { get(last(chat.messages), 'message', '') }
                            active = { chat.id }
                            onClick = { ()=>{ setActiveChat(chat) } }
                        />
                    )
                  })

                  :
                  differenceBy(users, [user], 'name').map((user)=>{
                    return <SideBarOption
                        key = { user.id }
                        name = { user.name }
                        onClick = { ()=>{ this.addChatForUser(user.name) }  }
                    />
                  })
            }
          </div>
          <div className="current-user">
            <span>{user.name}</span>
            <div onClick={()=>{logout()}}>Выход
            </div>
          </div>
        </div>
    );

  }
}
