import React, {FC} from 'react';
import './App.css';
import Example from './components/Example/Example';

const App: FC = () => {
  return (
    <div className="App">
      <h1> Hello </h1>
      <Example />
    </div>
  );
};

export default App;
