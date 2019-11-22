import React from 'react';
import { View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { MStatusBar } from './MStatusBar';
import { Config } from '../../Utilities/Config';
import { Styles } from '../../Utilities/Styles';

export default class MView extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: Styles.backgroundColorHome }}>
				{Config.os === 1 ? (
					<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
						<View style={{ flex: 1 }}>
							<MStatusBar
								backgroundColor={
									this.props.statusbarColor ? this.props.statusbarColor : Styles.primaryColor
								}
								barStyle={this.props.statusbarColor === 'white' ? 'dark-content' : 'light-content'}
							/>
							<SafeAreaView style={{ flex: 1 }}>
								<View style={[ { flex: 1 }, this.props.style ]}>{this.props.children}</View>
							</SafeAreaView>
						</View>
					</KeyboardAvoidingView>
				) : (
					<View style={{ flex: 1 }}>
						<MStatusBar
							backgroundColor={
								this.props.statusbarColor ? this.props.statusbarColor : Styles.primaryColor
							}
							barStyle={this.props.statusbarColor === 'white' ? 'dark-content' : 'light-content'}
						/>
						<SafeAreaView style={{ flex: 1 }}>
							<View style={[ { flex: 1 }, this.props.style ]}>{this.props.children}</View>
						</SafeAreaView>
					</View>
				)}
			</View>
		);
	}
}
