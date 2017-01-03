import React      from 'react';
import { render } from 'react-dom';
import ViewUser   from './ViewUser.jsx';

class ViewUserList extends React.Component
{

  render()
  {
    var userList = this.props.userList;
    var usersToRender = [];

    for (var i = 0, len = userList.length; i < len; i++)
    {
      var user = userList[i];

      if (user.connected == true)
      {
        usersToRender.push(
          <ViewUser
            key={i}
            id={user.id}
            username={user.username}
            lastActive={user.lastActive}
          />
        );
      }
    }

    return (
      <div id="users">
        <h2>User list</h2>
        {usersToRender}
      </div>
    );
  }

}

export default ViewUserList;
