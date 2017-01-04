import React      from 'react';
import { render } from 'react-dom';
import $          from 'jquery';

// This is a "controlled component": form input is reflected in the component state.
class FormInputUsername extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    var now = new Date() / 1000;
    var user = {
      id: null,
      username: this.state.value,
      lastActive: now,
      connected: false
    };
    
    this.props.onLogin(user);
    this.props.joinChat();
  }

  render()
  {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Login" />
      </form>
    );
  }

}

export default FormInputUsername;
