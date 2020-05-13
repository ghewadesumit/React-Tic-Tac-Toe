import React from 'react';
import './grid.styles.scss';
import { stringToNumber } from '../../utils/grid.utils';
import Boxes from '../boxes/boxes.component';
import MessageBox from '../message/message.component';
import Header from '../Header/header.component';

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMarker: 'X',
			message: null,
			playerX: null,
			playerO: null,
			disable: true,
		};
		this.grid = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		];
		this.count = 0;
		this.inputPlayerXRef = React.createRef();
		this.inputPlayerORef = React.createRef();
	}

	checkequals = (a, b, c) => {
		return a === b && b === c && a !== '';
	};

	handleClick = (event) => {
		const { currentMarker } = this.state;

		let [x, y] = stringToNumber(event.target.id);

		this.grid[x][y] = currentMarker;

		event.target.textContent = this.grid[x][y];
		event.target.style.pointerEvents = 'none';

		if (currentMarker === 'X') {
			this.setState({ ...this.state, currentMarker: 'O' });
		} else {
			this.setState({ ...this.state, currentMarker: 'X' });
		}
		this.count++;
		this.checkWinner();
	};

	disableBoxes = () => {
		const boxElement = document.querySelectorAll('.box');
		boxElement.forEach((item) => (item.style.pointerEvents = 'none'));
	};

	shakeBoxes = (boxes) => {
		for (let i of boxes) {
			document.getElementById(`${i}`).classList.add('box-shake-animation');
		}
	};

	checkWinner = () => {
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
				this.shakeBoxes([`${i}0`, `${i}1`, `${i}2`]);
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
				this.shakeBoxes([`0${i}`, `1${i}`, `2${i}`]);
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
			this.shakeBoxes([`00`, `11`, `22`]);
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
			this.shakeBoxes([`02`, `11`, `20`]);
			this.disableBoxes();
			return;
		}

		if (this.count === 9) {
			this.setState({
				...this.state,
				message: `its a Tie!!! no one won the game please try again`,
			});
			this.disableBoxes();
			this.shakeBoxes([`00`, `01`, `02`, '10', '11', '12', '20', '21', '22']);
			return;
		}
	};

	checkCurrentPlayer = (marker) => {
		let currentPlayer =
			marker === 'X' ? this.state.playerX : this.state.playerO;
		return currentPlayer;
	};

	handleStartGame = () => {
		let playerXName = this.inputPlayerXRef.current.value;
		let playerOName = this.inputPlayerORef.current.value;
		this.setState({
			...this.state,
			disable: false,
			playerX: playerXName,
			playerO: playerOName,
		});
	};

	render() {
		const { message, currentMarker, disable } = this.state;

		let currentPlayer = this.checkCurrentPlayer(currentMarker);
		let gridStyle = disable ? 'grid-container-cover' : null;
		return (
			<div className='main-container'>
				<Header
					startGame={this.handleStartGame}
					inputXRef={this.inputPlayerXRef}
					inputORef={this.inputPlayerORef}
				/>
				<div className='grid'>
					<Boxes gridStyle={gridStyle} clickBox={this.handleClick} />
					<MessageBox
						messageStatement={message}
						currentPlayer={currentPlayer}
						currentMarker={currentMarker}
					/>
				</div>
			</div>
		);
	}
}

export default Grid;
