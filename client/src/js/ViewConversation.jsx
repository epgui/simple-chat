import React       from 'react';
import { render }  from 'react-dom';
import ViewMessage from './ViewMessage.jsx';

class ViewConversation extends React.Component
{
  componentWillUpdate()
  {
    var node = this.refs.conversationMessages;
    var scrollPosition = node.scrollTop + node.offsetHeight;
    this.shouldScrollToBottom = (scrollPosition === node.scrollHeight);
  }

  componentDidUpdate()
  {
    if (this.shouldScrollToBottom)
    {
      var node = this.refs.conversationMessages;
      node.scrollTop = node.scrollHeight;
    }
  }

  render()
  {
    var user = this.props.user;
    var messagesInState = this.props.messages;
    var messagesToRender = [];
    var lastMessageAuthor = null;

    for (var i = 0, len = messagesInState.length; i < len; i++)
    {
      var message = messagesInState[i];
      var messageClass = "message";
      var messageAuthorClass = "messageAuthor";

      if (message.author == "Server")
      {
        messageClass += " server";
      }
      else if (message.author == this.props.user.username)
      {
        messageClass += " self";
      }

      if (message.author == lastMessageAuthor)
      {
        messageAuthorClass += " hidden";
        messageClass += " running";
      }

      lastMessageAuthor = message.author;

      messagesToRender.push(
        <div key={i} className={messageClass} id={"messageID-" + message.id}>
          <span className={messageAuthorClass}>{message.author}</span>
          <span className="messageContents">{message.contents}</span>
          <span className="messageTimestamp">{message.timestamp}</span>
        </div>
      );
    }

    return (
      <div id="conversation">
        <h2>Conversation</h2>
        <div id="conversationMessages" ref="conversationMessages">
          {messagesToRender}
        </div>
      </div>
    );
  }

}

export default ViewConversation;
