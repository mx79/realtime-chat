// App.js
import React, { Component } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";
import Header from "./components/header/header";
import ChatHistory from "./components/chatHistory/chatHistory";
import ChatInput from "./components/chatInput/chatInput";


class App extends Component {
  // Initialize websocket conn on start
  constructor(props) {
    super(props);
    this.state = {
        ChatHistory: []
    }
  }
  // Will be called automatically as part of our Components life-cycle
  componentDidMount() {
      connect((msg) => {
          console.log("New Message")
          this.setState(prevState => ({
              chatHistory: [...this.state.chatHistory, msg]
          }))
          console.log(this.state);
      });
  }
  // Allow to send messages to our backend
  send(event) {
      if (event.keyCode === 13) {
          sendMsg(event.target.value)
          event.target.value = ""
      }
  }
  // App display
  render() {
    return (
        <div className="App">
          <Header/>
          <ChatHistory chatHistory={this.state.chatHistory}/>
          <ChatInput  send={this.send}/>
          <button onClick={this.send}>Hit</button>
        </div>
    );
  }
}

export default App;
