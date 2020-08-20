import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar} from "@material-ui/core";

// TODO: 2020-08-20 Сделать начальную страницу

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <AppBar position="static"></AppBar>
  )
}

export default App;
