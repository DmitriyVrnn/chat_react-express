import React, { PureComponent } from 'react'

export default class SideBarOption extends PureComponent {
    render() {
        const { active, lastMessage, name, onClick } = this.props
        return (
            <div 
                className={`user ${active ? 'active':''}`}
                onClick={onClick}
                >
                <div className="user-info">
                    <div className="name">{name}</div>
                    <div className="last-message">{lastMessage}</div>
                </div>
                
            </div>
        )
    }
}
