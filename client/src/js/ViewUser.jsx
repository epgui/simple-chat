import React        from 'react';
import { render }   from 'react-dom';

class ViewUser extends React.Component
{

  render()
  {
    return (
      <div className="user">
        <span className="username">{this.props.username}</span>
      </div>
    );
  }

}

export default ViewUser;
