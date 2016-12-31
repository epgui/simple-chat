import React            from 'react';
import ViewConversation from './ViewConversation.jsx';
import ViewUserList     from './ViewUserList.jsx';

class ViewChatScreen extends React.Component
{
  
  componentDidMount()
  {
    // var this.connection = new WebSocket("ws://www.example.com/socketserver");
    // this.connection.onmessage = this.receiveMessage;
    // this.connection.onerror = this.catchConnectionError;
    // this.connection.onclose = this.closeConnection;
  }

  receiveMessage(message)
  {
    // if message is an actual user message
    // console.log("Message received: " + JSON.stringify(message));
    // this.props.onMessageReceive(message);

    // otherwise if message is a read receipt
    // console.log("Roger that!");

    // otherwise if message pertains to user list
    // console.log("There was a change to the user list!");
  }

  sendMessage(message)
  {
    if (message !== "")
    {
      this.connection.send(message);
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
          <ViewConversation/>
          <div id="textInput">

          </div>
        </div>
        <div id="userList">
          <ViewUserList/>
        </div>
      </div>
    );
  }
}

export default ViewChatScreen;
