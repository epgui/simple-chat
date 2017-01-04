import React                from 'react';
import ViewConversation     from './ViewConversation.jsx';
import ViewUserList         from './ViewUserList.jsx';
import FormInputSendMessage from './FormInputSendMessage.jsx';

const HANDSHAKE = "login-handshake";

class ViewChatScreen extends React.Component
{

  componentDidMount()
  {
    this.connection = new WebSocket("ws://localhost:4567/chat");
    this.connection.onmessage = this.receiveMessage.bind(this);
    this.connection.onerror = this.catchConnectionError;
    this.connection.onclose = this.closeConnection;
    this.connection.onopen = function(event) {
      this.sendMessage(HANDSHAKE);
    }.bind(this);
  }

  receiveMessage(websocketCommunication)
  {

    var data = JSON.parse(websocketCommunication.data);

    console.log("data:");
    console.log(data);

    var message = {
      "id":        data.message.id,
      "author":    data.message.author,
      "contents":  data.message.contents,
      "timestamp": data.message.timestamp
    };

    console.log("message:");
    console.log(message);

    this.updateUserList(data.userList);

    // if message is an actual user message
    this.props.onMessageReceive(message);

    // otherwise if message is a read receipt
    // console.log("Roger that!");

    // otherwise if message pertains to user list
    // console.log("There was a change to the user list!");
  }

  updateUserList(userList) // Probably very inefficient, this was hacked together in 2 minutes
  {
    var unmatchedUsers = [];

    for (var i = 0, iLength = userList.length; i < iLength; i++)
    {
      var matched = false;

      for (var j = 0, jLength = this.props.userList.length; j < jLength; j++)
      {
        console.log({
          "server": {
            "id": userList[i].id,
            "username": userList[i].username
          },
          "state": {
            "id": this.props.userList[j].id,
            "username": this.props.userList[j].username
          }
        });
        if (userList[i].id == this.props.userList[j].id)
        {
          if (userList[i].username != this.props.userList[j].username)
          {
            this.props.onUsernameChange(userList[i]);
          }
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
    else // See if we need to disconnect any users
    {
      for (var i = 0, iLength = this.props.userList.length; i < iLength; i++)
      {
        var matched = false;

        for (var j = 0, jLength = userList.length; j < jLength; j++)
        {
          if (this.props.userList[i].id == userList[j].id)
          {
            matched = true;
          }
        }

        if (matched == false)
        {
          unmatchedUsers.push(this.props.userList[i]);
        }
      }

      if (unmatchedUsers.length > 0)
      {
        // TODO: TEST THIS!!!
        this.props.onUserDisconnect(unmatchedUsers[0]);
      }
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
        "id": 0,
        "contents": message,
        "author": this.props.user.username,
        "timestamp": timestamp
      };

      this.connection.send(JSON.stringify(json));

      // Do not do this until read receipts are implemented
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
      <div id="chatScreen">``
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
            onActivity={this.props.onActivity}
          />
        </div>
      </div>
    );
  }
}

export default ViewChatScreen;
