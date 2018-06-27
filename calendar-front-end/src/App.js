import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar/';

class App extends Component {
  onDayClick = (e, day) => {
    alert(day)
  }

  render() {
    return (
      <div className="App">
        <Calendar onDayClick={(e, day) => this.onDayClick(e, day)}/>
      </div>
    );
  }
}

export default App;
