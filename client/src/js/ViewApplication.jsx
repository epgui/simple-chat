import React           from 'react';
import { render }      from 'react-dom';
import { VIEW_STATE }  from './StateMachineDefinitions.js';
import ViewChatScreen  from './ViewChatScreen.jsx';
import ViewLoginScreen from './ViewLoginScreen.jsx';

class ViewApplication extends React.Component
{

  render()
  {
    var views = [];

    switch (this.props.view)
    {
      case VIEW_STATE.SPEAK_SCREEN:
        views.push(
          <ViewChatScreen
            key={1}
            error={this.props.error}
            user={this.props.user}
            messages={this.props.messages}
            userList={this.props.userList}
            onMessageSend={this.props.send}
            onMessageReceive={this.props.receive}
            onMessageConfirm={this.props.confirm}
            onUserConnect={this.props.addUser}
            onUserDisconnect={this.props.disconnectUser}
            onUsernameChange={this.props.onUsernameChange}
            onActivity={this.props.onActivity}
          />
        );
        break;
      default:
        views.push(
          <ViewLoginScreen
            key={1}
            error={this.props.error}
            onLogin={this.props.onUsernameChange}
            onJoinChat={this.props.connectToChat}
          />
        );
    }

    return (
      <div id="interface">
        {views}
      </div>
    );
  }

}

export default ViewApplication;
