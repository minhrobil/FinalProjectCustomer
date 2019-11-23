import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import MView from '../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles } from '../../Utilities/Styles';
import MButton from '../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';
import { setUserInfoAction } from '../../redux-saga/userInfo';

import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import { ActivityIndicator } from 'react-native-paper';
import HeaderCommon from '../../components/customize/HeaderCommon';
import Utilities from '../../Utilities/Utilities';
import OneLine, { OneLineMedium } from '../../components/customize/OneLine';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customer_name: '',
			customer_address: ''
		};
	}
	componentDidUpdate(PrevProps) {}
	onChangeCustomerName = (text) => {
		this.setState({
			customer_name: text
		});
	};
	view_input_customer_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.customer_name}
						placeholder="Nhập tên người nhận"
						onChangeText={this.onChangeCustomerName}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}

	view_input_customer_address() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<View style={[ styles.text_input, { flex: 3, justifyContent: 'center' } ]}>
						<TextPoppin style={[ styles.text_content, { color: '#C7C7CD' } ]}>
							Nhập địa chỉ nhận hàng
						</TextPoppin>
					</View>
				</View>
			</MShadowView>
		);
	}
	_submit = () => {
		if (this.state.username && this.state.password) {
			this.props.login(this.state.username, this.state.password);
		} else {
			if (this.state.username == '') {
				this.alert.showAlert(`Bạn phải nhập tài khoản`, () => {});
			} else if (this.state.password == '') {
				this.alert.showAlert(`Bạn phải nhập mật khẩu`, () => {});
			}
		}
	};
	goAutocompleteAddress = () => {
		this.props.navigation.navigate('AutocompleteAddress');
	};

	render() {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon
					title="Giỏ hàng của bạn"
					actionLeft={() => {
						this.props.navigation.goBack();
					}}
				/>
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								backgroundColor: 'white',
								alignItems: 'center'
							}}
						>
							<View
								style={{
									width: 40,
									height: 40,
									justifyContent: 'center',
									alignItems: 'center',
									borderWidth: 1,
									borderRadius: 5,
									borderColor: Styles.backgroundColorHome
								}}
							>
								<TextPoppin style={[ styles.title, { color: Styles.primaryColor } ]}>1x</TextPoppin>
							</View>
							<View style={{ flex: 1, paddingHorizontal: 10 }}>
								<TextPoppin style={[ styles.title, {} ]}>Chân gà sả ớt</TextPoppin>
							</View>
							<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
								{Utilities.instance().add_dot_number(100000)}
							</TextPoppin>
						</View>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								backgroundColor: 'white',
								alignItems: 'center'
							}}
						>
							<OneLine />
						</View>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								backgroundColor: 'white',
								alignItems: 'center'
							}}
						>
							<View
								style={{
									width: 40,
									height: 40,
									justifyContent: 'center',
									alignItems: 'center',
									borderWidth: 1,
									borderRadius: 5,
									borderColor: Styles.backgroundColorHome
								}}
							>
								<TextPoppin style={[ styles.title, { color: Styles.primaryColor } ]}>1x</TextPoppin>
							</View>
							<View style={{ flex: 1, paddingHorizontal: 10 }}>
								<TextPoppin style={[ styles.title, {} ]}>Chân gà sả ớt</TextPoppin>
							</View>
							<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
								{Utilities.instance().add_dot_number(100000)}
							</TextPoppin>
						</View>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								backgroundColor: 'white',
								alignItems: 'center'
							}}
						>
							<OneLine />
						</View>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								backgroundColor: 'white',
								alignItems: 'center'
							}}
						>
							<View style={{ flex: 1, paddingHorizontal: 10 }}>
								<TextPoppin style={[ styles.title, {} ]}>Tổng giá trị đơn hàng</TextPoppin>
							</View>
							<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
								{Utilities.instance().add_dot_number(100000)}
							</TextPoppin>
						</View>
						<OneLineMedium />
						<View style={{ padding: Config.PADDING_HORIZONTAL, backgroundColor: 'white' }}>
							<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>Tên người nhận *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_customer_name()}</View>
							</View>
							<TouchableOpacity>
								<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>Địa chỉ nhận hàng *</TextPoppin>

								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_customer_address()}</View>
								</View>
							</TouchableOpacity>
						</View>
						<OneLineMedium height={150} />
					</ScrollView>
					<View
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							backgroundColor: 'white',
							padding: 10
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<View style={{ flex: 1, marginBottom: 10 }}>
								<TextPoppin style={[ styles.title, {} ]}>Tổng cộng</TextPoppin>
							</View>
							<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
								{Utilities.instance().add_dot_number(100000)}
							</TextPoppin>
						</View>
						<TouchableOpacity
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								height: 50,
								borderRadius: 5,
								backgroundColor: Styles.primaryColor
							}}
						>
							<TextPoppin style={[ styles.title, { color: 'white' } ]}>Đặt đơn hàng</TextPoppin>
						</TouchableOpacity>
					</View>
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
	return {};
}

export default connect(mapStateToProps, {})(Cart);

const styles = StyleSheet.create({
	mview_submit: { borderRadius: 40 },
	view_search: {
		borderRadius: 4
	},
	button_submit: {
		width: '105%',
		height: '105%'
	},
	title: {
		fontSize: Styles.fontSize,
		fontWeight: Config.os == 2 ? 'bold' : '500',
		color: '#3f3f3f',
		marginBottom: Config.os == 2 ? 5 : 1
	},
	text_input: {
		width: '100%',
		height: Config.HEIGHT_TEXT_INPUT,
		// padding: 15,
		backgroundColor: 'white',
		// borderRadius: 3,
		// elevation: 3,
		// shadowColor: 'gray',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.1,
		color: '#656565',
		fontFamily: 'Poppins-Regular',
		fontSize: Styles.fontSize
	},
	imgBackground: {
		width: Config.widthDevice,
		height: Config.widthDevice * 1.36
	},
	logo: {
		width: Config.widthDevice * 0.6,
		height: Config.widthDevice * 0.4
	},
	containLogo: {
		alignItems: 'center',
		marginTop: 0
	},
	// boxInput: {
	// 	height: 50,
	// 	borderRadius: 5,
	// 	borderWidth: 1,
	// 	borderColor: '#D6D6D6',
	// 	width: Config.widthDevice - Config.widthDevice * 0.225,
	// 	flexDirection: 'row',
	// 	alignItems: 'center',
	// 	paddingLeft: 14,
	// 	paddingRight: 14
	// },
	input: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		color: Styles.textColor
	},
	btnLogin: {
		// marginTop: 30,
		// padding: 10,
		// elevation: 3,
		// shadowColor: '#969696',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.7,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnViewGradient: {
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnSignUp: {
		borderRadius: 5,
		width: Config.widthDevice - Config.widthDevice * 0.225,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
