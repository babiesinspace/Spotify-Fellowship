import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventsContainer from './components/EventsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Calendar</h1>
        </div>
        <EventsContainer />
      </div>
    );
  }
}

export default App;