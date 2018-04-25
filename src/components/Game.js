import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
import Icon from 'react-native-vector-icons/FontAwesome';

class Game extends React.Component {
	static propTypes = {
		randomNumberCount: PropTypes.number.isRequired,
		initialSeconds: PropTypes.number.isRequired,
		onPlayAgain: PropTypes.func.isRequired,
		levelUp: PropTypes.func.isRequired,
		levelDown: PropTypes.func.isRequired,
	}

	
	state = {
		selectedIds: [],
		remainingSeconds: this.props.initialSeconds,
	}

	randomNumbers = Array.from({ length: this.props.randomNumberCount })
						 .map(() => 1 + Math.floor(10 * Math.random()));

	target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2)
				 .reduce((acc, curr) => acc + curr, 0);

	// shuffle the random numbers
	shuffledRandomNumbers = shuffle(this.randomNumbers);

	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState((prevState) => {
				return {remainingSeconds: prevState.remainingSeconds - 1};
			}, () => {
				if (this.state.remainingSeconds === 0) {
					clearInterval(this.intervalId);
				}
			});	
		},  1000);
	}

	//reset

	componentWillUnmount () {;
		clearInterval(this.intervalId)
	}

	isNumberSelected = (numberIndex) => {
		return this.state.selectedIds.indexOf(numberIndex) >= 0;
	};

	selectNumber = (numberIndex) => {
		this.setState((prevState) => {
			return { selectedIds: [...prevState.selectedIds, numberIndex]};
		})
	};

	gameStatus = "PLAYING";

	componentWillUpdate(nextProps, nextState){
		if (nextState.selectedIds !== this.state.selectedIds || 
			nextState.remainingSeconds === 0){
			this.gameStatus = this.calcGameStatus(nextState);
			// stop the timer
			if(this.gameStatus !== "PLAYING") {
				clearInterval(this.intervalId);
			}
		}
	}
	// game status
	calcGameStatus = (nextState) => {
		const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
			return acc + this.shuffledRandomNumbers[curr];
		}, 0);
		if (nextState.remainingSeconds === 0) {
			return "LOST";
		}
		if (sumSelected < this.target) {
			return "PLAYING";
		} else if (sumSelected === this.target) {
			return "WON";
		} else{
			return "LOST";
		}
	};

	targetPanelStyle = () => {

	}

	

	render() {
		const gameStatus = this.gameStatus;
		return (
			<View style={styles.container}>
				// the sum
				<Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
					{this.target}
				</Text>
				// the individual number

				<View style={styles.randomContainer}>
					{this.shuffledRandomNumbers.map((randomNumber, index) => 
						<RandomNumber 
							key={index}
							id={index}
							number={randomNumber} 
							isDisabled = {this.isNumberSelected(index) || gameStatus !== "PLAYING"}
							onPress={this.selectNumber}
							numberCount = { this.props.randomNumberCount}
						/>
					)} 
				</View>

				<View style={styles.functionContainer}>

					<Text style= {styles.timeLeft} > Time Left</Text>

					<Text style= {styles.timeDisplay}> {this.state.remainingSeconds} </Text>
					
					<TouchableOpacity style={[styles.changeLevel, {left: 10,}]} onPress={this.props.levelUp}>
						<Icon name="arrow-up" size={50} color="#4F8EF7" />
						
					</TouchableOpacity>

					<TouchableOpacity style={[styles.changeLevel, {right: 10,}]} onPress={this.props.levelDown}>
						<Icon name="arrow-down" size={50} color="#4F8EF7" />
					</TouchableOpacity>

				</View>

				{this.gameStatus !== "PLAYING" && (
					<TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPlayAgain}>
						<Text style={styles.button}>Play again</Text>
					</TouchableOpacity>
				) || this.gameStatus === "PLAYING" && (
					<View style={styles.buttonContainer}>
						<Text style={styles.button}> Hurry Up!</Text>
					</View>
				)

				};
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#030723',
		flex: 1,
		paddingTop:30,
	},

	target:{
		fontSize:40,
		backgroundColor:"#aaa",
		//marginHorizontal: 50,
		textAlign:"center",
		color: "#fff",
	},

	randomContainer:{
		width:"100%",
		flex:3,
		flexDirection: "row",
		flexWrap: "wrap",
		backgroundColor: "#63819b",
		alignItems: "flex-end",
		justifyContent:"center"
	},

	functionContainer:{
		flex: 1,
		backgroundColor: "#030723",
		
	},

	timeLeft:{
		color:"#fff", 
		textAlign:"center",
		fontSize:30,
		marginTop: 5,
		marginBottom: 20,
	},

	timeDisplay:{
		color:"#fff",
		fontSize:40,
		textAlign:"center",
	},

	changeLevel:{
		//backgroundColor: "#fff",
		alignSelf: 'flex-end', 
		position: "absolute",
		top: 5,
	},

	buttonContainer: {
		height:37,
	},

	button:{
		textAlign:"center",
		paddingTop:5,
		fontSize:20,
		color:"#efdb09",
		fontStyle: "italic",
	},



	STATUS_PLAYING:{
		backgroundColor: '#030723',
	},
	STATUS_WON:{
		backgroundColor: 'green',
	},
	STATUS_LOST:{
		backgroundColor: 'red',
	},

});

export default Game;