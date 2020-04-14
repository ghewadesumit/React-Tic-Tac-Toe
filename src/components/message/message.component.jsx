import React from "react";

class MessageBox extends React.Component {
  handleRefresh = () => {
    window.location.reload();
  };
  render() {
    console.log(`Props are ${this.props}`);
    const { messageStatement, currentPlayer, currentMarker } = this.props;
    let playerData = currentPlayer
      ? `Your Turn ${currentPlayer} ${currentMarker}`
      : "";

    let buttonDisplay = messageStatement ? (
      <button onClick={this.handleRefresh} className="play-again">
        Play Again
      </button>
    ) : null;
    return messageStatement ? (
      <div className="message-container">
        <div className="message">{messageStatement}</div>
        {buttonDisplay}
      </div>
    ) : (
      <div className="message-container">
        <div className="message">{playerData}</div>
        {buttonDisplay}
      </div>
    );
  }
}
export default MessageBox;
