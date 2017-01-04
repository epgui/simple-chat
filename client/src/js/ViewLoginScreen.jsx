import React             from 'react';
import { render }        from 'react-dom';
import FormInputUsername from './FormInputUsername.jsx';

class ViewLoginScreen extends React.Component
{

  render()
  {
    var submitUsername = function() {
    };

    return (
      <div id="loginScreen">
        <h1>ChatMaster 2000</h1>
        <p>Please enter your name.</p>
        <FormInputUsername
          onLogin={this.props.onLogin}
          joinChat={this.props.onJoinChat}
        />
      </div>
    );
  }

}

export default ViewLoginScreen;
