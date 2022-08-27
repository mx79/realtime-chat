// App.js
import React, { Component } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";
import Header from "./components/header/header";


class App extends Component {
  // Initialize websocket conn on start
  constructor(props) {
    super(props);
    connect();
  }
  // Allow to send messages from our backend
  send() {
    console.log("hello");
    sendMsg("hello");
  }
  // App display
  render() {
    return (
        <div className="App">
          <Header/>
          <button onClick={this.send}>Hit</button>
        </div>
    );
  }
}

export default App;
