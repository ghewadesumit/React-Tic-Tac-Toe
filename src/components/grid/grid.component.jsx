import React from "react";
import "./grid.styles.scss";
import { stringToNumber } from "../../utils/grid.utils";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarker: "X",
      message: null,
      playerX: null,
      playerO: null,
      disbale: true,
    };
    this.grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.count = 0;
    this.inputPlayerXRef = React.createRef();
    this.inputPlayerORef = React.createRef();
  }

  checkequals = (a, b, c) => {
    return a === b && b === c && a !== "";
  };

  handleClick = (event) => {
    const { currentMarker } = this.state;

    let [x, y] = stringToNumber(event.target.id);

    this.grid[x][y] = currentMarker;

    event.target.textContent = this.grid[x][y];
    event.target.style.pointerEvents = "none";

    if (currentMarker === "X") {
      this.setState({ ...this.state, currentMarker: "O" });
    } else {
      this.setState({ ...this.state, currentMarker: "X" });
    }
    this.count++;
    this.checkWinner();
  };

  disableBoxes = () => {
    const boxElement = document.querySelectorAll(".box");
    boxElement.forEach((item) => (item.style.pointerEvents = "none"));
  };

  checkWinner = () => {
    if (this.count === 9) {
      this.setState({
        ...this.state,
        message: `its a Tie!!! no one won the game please try again`,
      });
      this.disableBoxes();
      return;
    }

    for (let i = 0; i < 3; i++) {
      //horizontal
      if (this.checkequals(this.grid[i][0], this.grid[i][1], this.grid[i][2])) {
        this.setState({
          ...this.state,
          message: `Winner of the Tic Tac Toe is ${this.checkCurrentPlayer(
            this.grid[i][0]
          )}`,
        });
        this.disableBoxes();
        return;
      }

      //vertical
      if (this.checkequals(this.grid[0][i], this.grid[1][i], this.grid[2][i])) {
        this.setState({
          ...this.state,
          message: `Winner of the Tic Tac Toe is ${this.checkCurrentPlayer(
            this.grid[0][i]
          )}`,
        });
        this.disableBoxes();
        return;
      }
    }

    //diagonal from left to right
    if (this.checkequals(this.grid[0][0], this.grid[1][1], this.grid[2][2])) {
      this.setState({
        ...this.state,
        message: `Winner of the Tic Tac Toe is ${this.checkCurrentPlayer(
          this.grid[0][0]
        )}`,
      });
      this.disableBoxes();
      return;
    }

    //diagonal from right to left
    else if (
      this.checkequals(this.grid[0][2], this.grid[1][1], this.grid[2][0])
    ) {
      this.setState({
        ...this.state,
        message: `Winner of the Tic Tac Toe is ${this.checkCurrentPlayer(
          this.grid[0][2]
        )}`,
      });
      this.disableBoxes();
      return;
    }
  };

  checkCurrentPlayer = (marker) => {
    let currentPlayer =
      marker === "X" ? this.state.playerX : this.state.playerO;
    return currentPlayer;
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleStartGame = () => {
    this.setPlayerName();
    this.setState({ ...this.state, disbale: false });
  };

  setPlayerName = () => {
    let playerXName = this.inputPlayerXRef.current.value;
    let playerOName = this.inputPlayerORef.current.value;
    this.setState({ ...this.state, playerX: playerXName, playerOName });
  };

  componentDidMount() {
    this.setPlayerName();
  }

  render() {
    let boxHolder = [];
    let boxId = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxId = `${i}${j}`;
        boxHolder.push(
          <div
            key={boxId}
            onClick={this.handleClick}
            className="box"
            id={boxId}
          ></div>
        );
      }
    }
    let currentPlayer = this.checkCurrentPlayer(this.state.currentMarker);

    let gridStyle = this.state.disbale ? "grid-container-cover" : null;

    return (
      <div className="grid">
        <input
          type="text"
          ref={this.inputPlayerXRef}
          defaultValue={`Player 1`}
          placeholder="Enter player 1"
        />
        <input
          type="text"
          defaultValue={`Player 2`}
          ref={this.inputPlayerORef}
          placeholder="Enter player 2"
        />
        <button onClick={this.handleStartGame}>start</button>

        <div className="grid-wrapper">
          <div className={gridStyle}></div>
          <div className={`grid-container`}>{boxHolder}</div>
        </div>

        {this.state.message ? (
          <div className="message-container">
            <div className="message">{this.state.message}</div>
            <button
              onClick={this.handleRefresh}
              className="play-again"
              style={{ visibility: "visible" }}
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="message-container">
            <div className="message">{`Your Turn player ${currentPlayer} ${this.state.currentMarker}`}</div>
            <button
              onClick={this.handleRefresh}
              className="play-again"
              style={{ visibility: "hidden" }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Grid;
