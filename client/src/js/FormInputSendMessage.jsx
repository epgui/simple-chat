import React      from 'react';
import { render } from 'react-dom';
import $          from 'jquery';

// This is a "controlled component": form input is reflected in the component state.
class FormInputSendMessage extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange   = this.handleChange.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event)
  {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event)
  {
    event.preventDefault();
    this.props.sendMessage(this.state.value);
  }

  handleKeyPress(event)
  {
    if (event.key === 'Enter')
    {
      event.preventDefault();
      this.handleSubmit(event);
    }
  }

  render()
  {
    return (
      <form id="messageForm">
        <div id="messageBox">
          <textarea value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        </div>
        <div id="sendMessageButton" onClick={this.handleSubmit}>Send</div>
      </form>
    );
  }

}

export default FormInputSendMessage;
