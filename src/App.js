import React from 'react';
import './App.css';
import TaskHeader from './TaskHeader';

function App() {
  return (<React.Fragment>
    <div className="task-1">
      <TaskHeader title="Задача 1" />
    </div>
    <div className="task-2">
      <TaskHeader title="Задача 2" />
    </div>
  </React.Fragment>);
}

export default App;
 