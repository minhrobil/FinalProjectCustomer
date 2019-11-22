import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ShadowView from 'react-native-shadow-android';
const default_style = {
	backgroundColor: 'white',
	borderRadius: 5,

	shadowColor: '#0000001a',
	shadowOffset: {
		width: 0,
		height: 0
	},
	shadowRadius: 5,
	shadowOpacity: 1
};
export default class MShadowView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: this.props.style ? { ...default_style, ...this.props.style } : default_style
		};
	}

	render() {
		return <ShadowView style={this.state.style}>{this.props.children}</ShadowView>;
	}
}
