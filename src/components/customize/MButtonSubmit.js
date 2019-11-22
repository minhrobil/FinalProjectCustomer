import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextHelvetica } from './MText';

export default class MButtonSubmit extends React.Component {
	render() {
		return (
			<TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress}>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					colors={[ '#EE5723', '#FCBE19' ]}
					style={[
						{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 45, borderRadius: 4 },
						this.props.style ? this.props.style : {}
					]}
				>
					<TextHelvetica
						style={this.props.textStyle ? this.props.textStyle : { color: 'white', fontSize: 16 }}
					>
						{this.props.text.toLocaleUpperCase()}
					</TextHelvetica>
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}
