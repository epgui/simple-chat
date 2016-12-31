import React          from 'react';
import { render }     from 'react-dom';
import { VIEW_STATE } from './StateMachineDefinitions.js';

class ViewApplication extends React.Component
{
render()
  {
    return (
      <div id="interface">
        <div id="header">
        </div>
        <div id="views">
        </div>
      </div>
    );
  }
}

export default ViewApplication;
