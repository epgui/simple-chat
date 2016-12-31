import React      from 'react';
import { render } from 'react-dom';

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
        <form onSubmit={submitUsername}>
          <input ref={null} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

}

export default ViewLoginScreen;
