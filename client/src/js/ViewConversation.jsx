import React       from 'react';
import { render }  from 'react-dom';
import ViewMessage from './ViewMessage.jsx';

class ViewConversation extends React.Component
{

  render()
  {
    var messages = [];

    return (
      <div id="conversation">
        <h2>Conversation</h2>
        {messages}
      </div>
    );
  }

}

export default ViewConversation;
