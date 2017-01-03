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

    // var userList = []
    // for (var i = 0, len = websocketCommunication.data.sessionUserMap.length; i < len; i++)
    // {
    //   var userFromList = websocketCommunication.data.sessionUserMap[i];
    //   userList.push(userFromList.username);
    // }

    // if message is an actual user message
    console.log(message);
    this.props.onMessageReceive(message);

    // otherwise if message is a read receipt
    // console.log("Roger that!");

    // otherwise if message pertains to user list
    // console.log("There was a change to the user list!");
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
      this.props.onMessageSend(json);
      console.log(json);
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
          <ViewUserList/>
        </div>
      </div>
    );
  }
}

export default ViewChatScreen;
