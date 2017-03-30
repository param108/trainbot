import React, { Component } from 'react';
import logo from './logo.svg';
import TrainerCanvas from './components/trainercanvas/TrainerCanvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to The Programming Trainer</h2>
        </div>
        <TrainerCanvas name="trainer_name" boxsize="100" width="1000" height="500"/>
      </div>
    );
  }
}

export default App;
