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

    var username = this.state.value;
    var chatServerURL = "http://localhost:4567/login/" + username;
    console.log("Attempting to reach " + chatServerURL);

    this.serverRequest = $.ajax(
    {
      url: chatServerURL,
      dataType: 'json',
      cache: false,
      async: true,
      success: function(data) {
        this.onLogin(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(chatServerURL, status, err.toString());
        console.warn(xhr.responseText);
      }.bind(this)
    });
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
