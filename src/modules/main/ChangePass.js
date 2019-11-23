import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import MView from '../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../Utilities/Styles';
import MButton from '../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';
import { changePassAction } from '../../redux-saga/changePass';
import { setUserInfoAction } from '../../redux-saga/userInfo';

import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import pencil from '../../assets/images/pencil.png';
class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account: this.props.navigation.state.params ? this.props.navigation.state.params.account : {},
			old_password: '',
			password: '',
			re_password: ''
		};
	}

	_submit = () => {
		const { old_password, password, re_password } = this.state;
		if (this.state.old_password && this.state.password && this.state.re_password) {
			this.alert.showAlert(
				`Bạn chắc chắn muốn đổi mật khẩu?`,
				() => {
					setTimeout(() => {
						var body = {
							old_password,
							new_password: password,
							re_new_password: re_password
						};
						this.props.changePassAction(body);
					}, 500);
				},
				() => {}
			);
		} else {
			if (this.state.old_password == '') {
				this.alert.showAlert(`Mật khẩu cũ không được để trống`, () => {});
			} else if (this.state.password == '') {
				this.alert.showAlert(`Mật khẩu mới không được bỏ trống`, () => {});
			} else if (this.state.re_password == '') {
				this.alert.showAlert(`Nhập lại mật khẩu mới không được bỏ trống`, () => {});
			}
		}
	};

	goLogin = () => {
		this.props.navigation.pop();
	};
	componentDidUpdate(PrevProps) {
		if (this.props.changePassReducer != PrevProps.changePassReducer) {
			if (this.props.changePassReducer.isSuccess) {
				// var data = {
				// 	...this.props.userInfoReducer.data,
				// 	user: this.props.changePassReducer.data
				// };
				// console.log(data);
				// this.props.setUserInfoAction(data);
				// MAsyncStorage.setUserInfo(data);
				this.alert.showAlert(this.props.changePassReducer.message, () => {});
			}
			if (this.props.changePassReducer.isError) {
				this.alert.showAlert(this.props.changePassReducer.message, () => {});
			}
		}
	}
	onChangeOldPassword = (text) => {
		this.setState({
			old_password: text
		});
	};
	onChangePassword = (text) => {
		this.setState({
			password: text
		});
	};
	onChangeRePassword = (text) => {
		this.setState({
			re_password: text
		});
	};
	view_input_old_password() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.old_password}
						placeholder="Nhập mật khẩu cũ"
						secureTextEntry
						onChangeText={this.onChangeOldPassword}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_password() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.password}
						placeholder="Nhập mật khẩu mới"
						secureTextEntry
						onChangeText={this.onChangePassword}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}

	view_input_re_password() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.re_password}
						placeholder="Nhập lại mật khẩu mới"
						secureTextEntry
						onChangeText={this.onChangeRePassword}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_submit = () => {
		return (
			<View style={{ marginTop: 60 }}>
				<MShadowView style={[ styles.view_search ]}>
					<TouchableOpacity
						onPress={this._submit}
						style={{
							width: '100%',
							alignSelf: 'center',
							borderRadius: 4,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: Style.primaryColor,
							height: Config.HEIGHT_TEXT_INPUT
						}}
					>
						<TextPoppin
							style={[ styles.title, { color: 'white', fontSize: 20, marginTop: 0, marginBottom: 0 } ]}
						>
							Đổi mật khẩu
						</TextPoppin>
					</TouchableOpacity>
				</MShadowView>
			</View>
		);
	};
	render = () => {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon title="Đổi mật khẩu" actionLeft={this.props.navigation.goBack} />
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
							<TextPoppin style={styles.title}>Mật khẩu cũ *</TextPoppin>

							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_old_password()}</View>
							</View>
							<TextPoppin style={styles.title}>Mật khẩu mới *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_password()}</View>
							</View>
							<View>
								<TextPoppin style={styles.title}>Nhập lại mật khẩu mới *</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_re_password()}</View>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_submit()}</View>
							</View>
							{/* {this.view_submit()} */}
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
	};
}

function mapStateToProps(state) {
	return {
		userInfoReducer: state.userInfoReducer,
		changePassReducer: state.changePassReducer
	};
}

export default connect(mapStateToProps, { setUserInfoAction, changePassAction })(Account);

const styles = StyleSheet.create({
	mview_submit: { borderRadius: 40 },
	view_search: {
		borderRadius: 4
	},
	button_submit: {
		width: '100%',
		height: '100%'
	},
	title: {
		fontSize: Style.fontSize,
		fontWeight: Config.os == 2 ? 'bold' : '500',
		color: '#3f3f3f',
		marginTop: 30,
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
		fontSize: Style.fontSize
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
		color: Style.textColor
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
