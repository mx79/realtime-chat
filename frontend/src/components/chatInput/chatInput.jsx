import React, { Component } from "react";
import "./chatInput.scss";

class ChatInput extends Component {
    render() {
        return (
            <div className="ChatInput">
                <input onKeyDown={this.props.send} />
            </div>
        );
    }
}

export default ChatInput;