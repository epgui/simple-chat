import React                from 'react';
import ViewConversation     from './ViewConversation.jsx';
import ViewUserList         from './ViewUserList.jsx';
import FormInputSendMessage from './FormInputSendMessage.jsx';

class ViewChatScreen extends React.Component
{

  componentDidMount()
  {
    this.connection = new WebSocket("ws://localhost:4567/chat");
    this.connection.onmessage = this.receiveMessage.bind(this);
    this.connection.onerror = this.catchConnectionError;
    this.connection.onclose = this.closeConnection;
  }

  receiveMessage(websocketCommunication)
  {

    var data = JSON.parse(websocketCommunication.data);

    var message = {
      "id":        data.message.id,
      "author":    data.message.author,
      "contents":  data.message.contents,
      "timestamp": data.message.timestamp
    };

    var userList = data.userList;
    console.log(userList);
    this.updateUserList(data.userList);

    // if message is an actual user message
    this.props.onMessageReceive(message);

    // otherwise if message is a read receipt
    // console.log("Roger that!");

    // otherwise if message pertains to user list
    // console.log("There was a change to the user list!");
  }

  updateUserList(userList) // Probably very inefficient
  {
    var unmatchedUsers = [];

    for (var i = 0, len = userList.length; i < len; i++)
    {
      var matched = false;

      for (var j = 0, len = this.props.userList.length; j < len; j++)
      {
        if (userList[i].username == this.props.userList[j].username)
        {
          matched = true;
        }
      }

      if (matched == false)
      {
        unmatchedUsers.push(userList[i]);
      }
    }

    if (unmatchedUsers.length > 0)
    {
      this.props.onUserConnect(unmatchedUsers[0]);
    }
  }

  sendMessage(message)
  {
    if (message !== "")
    {
      // Get UNIX timestamp
      var timestamp = Math.round(new Date().getTime() / 1000);

      // Build a standard json message
      var json = {
        "id": 1,
        "contents": message,
        "author": this.props.user.username,
        "timestamp": timestamp
      }

      this.connection.send(JSON.stringify(json));
      // this.props.onMessageSend(json);
    }
  }

  catchConnectionError(error)
  {
    console.log(error);
  }

  closeConnection()
  {
    console.log("WebSocket connection closed");
  }

  render()
  {
    return (
      <div id="chatScreen">
        <div id="mainPanel">
          <ViewConversation
            key={1}
            user={this.props.user}
            messages={this.props.messages}
            onMessageConfirm={this.props.onMessageConfirm}
            onMessageReceive={this.props.onMessageReceive}
          />
          <FormInputSendMessage
            key={2}
            sendMessage={this.sendMessage.bind(this)}
          />
        </div>
        <div id="userList">
          <ViewUserList
            key={1}
            user={this.props.user}
            userList={this.props.userList}
            onUserConnect={this.props.onUserConnect}
            onUserDisconnect={this.props.onUserDisconnect}
          />
        </div>
      </div>
    );
  }
}

export default ViewChatScreen;
