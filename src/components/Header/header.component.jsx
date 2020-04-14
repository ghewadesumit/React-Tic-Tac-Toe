import React from "react";
import "./header.styles.scss";
class Header extends React.Component {
  render() {
    const { inputXRef, inputORef } = this.props;
    return (
      <div className="header">
        <div className="header-container">
          <h1 className="header-title">Tic Tac Toe</h1>
          <div className="player-input-container">
            <input
              type="text"
              ref={inputXRef}
              defaultValue={`Player 1`}
              placeholder="Enter player 1"
            />
            <input
              type="text"
              defaultValue={`Player 2`}
              ref={inputORef}
              placeholder="Enter player 2"
            />
          </div>
          <div className="btn-container">
            <button onClick={this.props.startGame} className="start-btn">
              start
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
