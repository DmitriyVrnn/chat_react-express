import React from 'react'
import './styles.css'

export default class MessageInput extends React.Component {

 state = {
   message: "",
 }

 handleSubmit = (e) => {
   e.preventDefault()
   this.sendMessage();
   this.setState({message:""})
 }

 sendMessage = () => {
   this.props.sendMessage(this.state.message)
 }

  render() {
   const {message} = this.state
    return (
        <div className="message-block">
          <form onSubmit={this.handleSubmit}>
            <input type="text"
                   value={message}
                   placeholder={'Напишите ваше сообщение'}
                   onKeyUp={e => e.key === 'Enter'}
                   onChange={({target}) => {
                     this.setState({message: target.value})
                   }}
            />
            <button type="submit">
              Отправить
            </button>

          </form>
        </div>
    )
  }
}