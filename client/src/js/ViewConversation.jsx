import React       from 'react';
import { render }  from 'react-dom';
import ViewMessage from './ViewMessage.jsx';

class ViewConversation extends React.Component
{

  render()
  {
    var user = this.props.user;
    var messagesInState = this.props.messages;
    var messagesToRender = [];

    for (var i = 0, len = messagesInState.length; i < len; i++)
    {
      var message = messagesInState[i];

      messagesToRender.push(
        <div key={i} className="message" id={"messageID-" + message.id}>
          <span className="messageAuthor">{message.author}</span>
          <span className="messageContents">{message.contents}</span>
          <span className="messageTimestamp">{message.timestamp}</span>
        </div>
      );
    }

    return (
      <div id="conversation">
        <h2>Conversation</h2>
        <div id="conversationMessages">
          {messagesToRender}
        </div>
      </div>
    );
  }

}

export default ViewConversation;
