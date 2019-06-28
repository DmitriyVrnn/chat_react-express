import React from 'react'
import './styles.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class MessageInput extends React.Component {

  state = {
    message: "",
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.sendMessage();
    this.setState({message: ""})
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
  }

  render() {
    const {message} = this.state
    return (
        <div className="message-block">
          <form className="form-input" onSubmit={this.handleSubmit}>
            <TextField
                className="text-field"
                type="text"
                value={message}
                placeholder={'Напишите ваше сообщение'}
                onKeyUp={e => e.key === 'Enter'}
                onChange={({target}) => {
                  this.setState({message: target.value})
                }}
            />
            <Button type="submit">
              Отправить
            </Button>

          </form>
        </div>
    )
  }
}