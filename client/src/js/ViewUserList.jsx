import React      from 'react';
import { render } from 'react-dom';
import ViewUser   from './ViewUser.jsx';

class ViewUserList extends React.Component
{

  render()
  {
    var users = [];

    return (
      <div id="users">
        <h2>User list</h2>
        {users}
      </div>
    );
  }

}

export default ViewUserList;
