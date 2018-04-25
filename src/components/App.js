import React from 'react';
import { StatusBar } from 'react-native';
import Game from './Game';


class App extends React.Component {
	state = {
		gameId: 1,
		numberCount: 4,
	};

	resetGame = () => {
		this.setState((prevState) => {
			return {gameId: prevState.gameId + 1};
		});
	}

	// change Levels
	levelUp = () => {
		if (this.state.numberCount >= 14){
			return;
		} else {
			this.state.numberCount += 2;
			this.resetGame();
		}


	}

	levelDown = () => {
		if (this.state.numberCount <= 4) {
			return;
		} else {
			this.state.numberCount -=2;
			this.resetGame();
		}
	}
	render() {
		StatusBar.setBarStyle('light-content', true);
		return (
			<Game key={this.state.gameId} 
				  onPlayAgain = {this.resetGame}
				  randomNumberCount={this.state.numberCount} 
				  initialSeconds={10}
				  levelUp={this.levelUp}
				  levelDown={this.levelDown}/>
		);
	}
}


export default App;