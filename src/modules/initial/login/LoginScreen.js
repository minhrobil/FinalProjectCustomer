import React from 'react';
import { View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import MView from '../../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../../Utilities/Config';
import { TextPoppin } from '../../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../../Utilities/Styles';
import MButton from '../../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../../components/customize/MAlert';
import { login } from '../../../redux-saga/Action';
import { connect } from 'react-redux';
import MAsyncStorage from '../../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../../components/customize/MShadowView';
import styles from './styles';

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone_code: '',
			phone_number: ''
		};
	}

	_submit = () => {
		if (this.state.phone_code && this.state.phone_number) {
			this.props.navigation.navigate('SMSValidation', {
				phone_code: this.state.phone_code,
				phone_number: this.state.phone_number
			});
			// this.props.login(this.state.username, this.state.password);
		} else {
			if (this.state.phone_code.length < 2) {
				this.alert.showAlert(`You must enter phone code`, () => {});
			} else if (this.state.phone_number == '') {
				this.alert.showAlert(`You must enter phone number`, () => {});
			}
		}
	};
	goSingin = () => {
		this.props.navigation.navigate('SigninScreen');
	};
	async componentDidMount() {}

	componentDidUpdate(PrevProps) {
		// if (PrevProps.loginRes.isError) {
		// 	this.alert.showAlert(PrevProps.loginRes.message ? PrevProps.loginRes.message : 'Có lỗi xảy ra!', () => {});
		// } else {
		// 	if (this.props.loginRes != PrevProps.loginRes) {
		// 		if (this.props.loginRes.isSuccess) {
		// 			this.props.navigation.dispatch(
		// 				StackActions.reset({
		// 					index: 0,
		// 					actions: [ NavigationActions.navigate({ routeName: 'main' }) ]
		// 				})
		// 			);
		// 		}
		// 	}
		// }
	}
	onChangePhoneCode = (text) => {
		this.setState({
			phone_code: text
		});
	};
	onChangePhoneNumber = (text) => {
		this.setState({
			phone_number: text
		});
	};
	view_input_phone_code() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<View
						style={{
							backgroundColor: 'white',
							justifyContent: 'center',
							alignItems: 'flex-end'
							// width: 30
						}}
					>
						<TextPoppin style={([ styles.title ], { color: '#656565', fontSize: 20 })}>+</TextPoppin>
					</View>
					<TextInput
						placeholder="00"
						value={this.state.phone_code}
						maxLength={5}
						keyboardType="numeric"
						onChangeText={this.onChangePhoneCode}
						style={[ styles.text_input, { flex: 1 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_phone_number() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.phone_number}
						maxLength={13}
						placeholder="input your phone number"
						keyboardType="numeric"
						onChangeText={this.onChangePhoneNumber}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_submit() {
		return (
			<View
				style={{
					width: 75,
					height: 75,
					alignSelf: 'center',
					marginTop: 30
				}}
			>
				<MShadowView style={styles.mview_submit}>
					<TouchableOpacity onPress={this._submit} style={styles.btnLogin}>
						<FastImage
							style={styles.button_submit}
							source={require('../../../assets/images/button_submit.png')}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</MShadowView>
			</View>
		);
	}
	render() {
		return (
			<MView statusbarColor={'white'}>
				<KeyboardAwareScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
						showsVerticalScrollIndicator={true}
					>
						<View style={styles.containLogo}>
							<FastImage style={styles.logo} source={require('../../../assets/images/logo_login.png')} />
						</View>
						{/* <View style={{ height: Config.heightDevice * 0.1 }} /> */}
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
							<TextPoppin style={styles.title}>Phone number</TextPoppin>
							<View style={{ flexDirection: 'row',marginHorizontal: Config.os==2? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_input_phone_code()}</View>
								{/* <View style={{ width: Config.os==2 ? 4 : 12 }} /> */}
								<View style={{ flex: 3 }}>{this.view_input_phone_number()}</View>
							</View>
							{this.view_submit()}
							<TextPoppin
								onPress={this.goSingin}
								style={[ styles.title, { color: '#656565', textAlign: 'center', margin: 20 } ]}
							>
								Don't have an account? Register now
							</TextPoppin>
						</View>
					</ScrollView>
				</KeyboardAwareScrollView>
				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView>
		);
	}
}

function mapStateToProps(state) {
	return {
		loginRes: state.Login
	};
}

export default connect(mapStateToProps, { login })(LoginScreen);
