import React from 'react';
import User from './components/User';
import './App.css';
import HabitContainer from './containers/HabitContainer';
function App() {
  return (
    <div className="App">
      User: <User/>  
      ---------------------
      HabitContainer: <HabitContainer/>
    </div>
  );
}

export default App;