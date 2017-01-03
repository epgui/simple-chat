import React        from 'react';
import { render }   from 'react-dom';

class ViewUser extends React.Component
{
  componentDidMount()
  {
    //setTimeout(this.onUserIdle(), 5000); // Check every 5 seconds
  }

  onUserIdle()
  {

  }

  render()
  {
    var now = new Date() / 1000;
    var statusIconColor = "red";

    if (this.props.connected == true)
    {
      // Indicator light turns green for users active less than 5 minutes ago.
      if (now - this.props.lastActive <= 300)
      {
        statusIconColor = "green";
      }
      else
      {
        statusIconColor = "yellow";
      }
    }

    return (
      <div className="user">
        <span className="username">{this.props.username}</span>
        <span className="userStatusIcon">
          <img src={"assets/" + statusIconColor + "Light.png"} />
        </span>
      </div>
    );
  }

}

export default ViewUser;
