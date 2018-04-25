import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';



class RandomNumber extends React.Component {
	static propTypes = {
		id:PropTypes.number.isRequired,
		number: PropTypes.number.isRequired,
		isDisabled: PropTypes.bool.isRequired,
		onPress: PropTypes.func.isRequired,
		numberCount: PropTypes.number.isRequired,
	}

	getHeight = (numberCount) => {
		return 375 * 2 / numberCount
	}

	state={
		height: this.getHeight(this.props.numberCount),
	}

	
	
	handlePress = () => {
		//console.log(this.props.number);
		if (this.props.isDisabled) {return;}
		this.props.onPress(this.props.id);
	}
	
	render(){
		return (
			<TouchableOpacity style={[styles.numberWrapper, {height: this.state.height}]} onPress={this.handlePress}>
				<Text style={[styles.random, this.props.isDisabled && styles.disabled]}> 
					{this.props.number} 
				</Text>
			</TouchableOpacity>
		);
	}
}



const styles = StyleSheet.create({
	numberWrapper:{
		width:"48%",
		backgroundColor:"#8a9dad",
		marginHorizontal:"1%",
		marginVertical: "1%",
		justifyContent: "center",
		//height:70,
	},
	random:{
		fontSize:35,
		color: "#fff",
		textAlign:"center",
	},
	disabled: {
		opacity: 0.3,
	}
});

export default RandomNumber;