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
        {users}
      </div>
    );
  }

}

export default ViewUserList;
