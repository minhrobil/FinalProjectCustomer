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
import { updateAccountAction } from '../../redux-saga/updateAccount';
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
			account: this.props.navigation.state.params ? this.props.navigation.state.params.account : {}
		};
	}

	_submit = () => {
		const { name, address, email, id } = this.state.account;
		if (this.state.account.name && this.state.account.address) {
			this.alert.showAlert(
				`Bạn chắc chắn muốn cập nhật tài khoản?`,
				() => {
					setTimeout(() => {
						var body = {
							name,
							address,
							email,
							id
						};
						this.props.updateAccountAction(body);
					}, 500);
				},
				() => {}
			);
		} else {
			if (this.state.account.name == '') {
				this.alert.showAlert(`Họ tên không được để trống`, () => {});
			} else if (this.state.account.phone_number == '') {
				this.alert.showAlert(`Địa chỉ không được bỏ trống`, () => {});
			}
		}
	};

	goLogin = () => {
		this.props.navigation.pop();
	};
	componentDidUpdate(PrevProps) {
		if (this.props.updateAccountReducer != PrevProps.updateAccountReducer) {
			if (this.props.updateAccountReducer.isSuccess) {
				var data = {
					...this.props.userInfoReducer.data,
					user: this.props.updateAccountReducer.data
				};
				console.log(data);

				this.props.setUserInfoAction(data);
				MAsyncStorage.setUserInfo(data);
				this.alert.showAlert(this.props.updateAccountReducer.message, () => {});
			}
			if (this.props.updateAccountReducer.isError) {
				this.alert.showAlert(this.props.updateAccountReducer.message, () => {});
			}
		}
	}
	onChangeName = (text) => {
		this.setState({
			account: {
				...this.state.account,
				name: text
			}
		});
	};
	onChangeEmail = (text) => {
		this.setState({
			account: {
				...this.state.account,
				email: text
			}
		});
	};
	onChangeAddress = (text) => {
		this.setState({
			account: {
				...this.state.account,
				address: text
			}
		});
	};

	view_input_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.account.name}
						placeholder="Nhập họ tên"
						onChangeText={this.onChangeName}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_email() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.account.email}
						placeholder="Nhập email"
						onChangeText={this.onChangeEmail}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_address() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.account.address}
						placeholder="Nhập địa chỉ"
						onChangeText={this.onChangeAddress}
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
							Cập nhật
						</TextPoppin>
					</TouchableOpacity>
				</MShadowView>
			</View>
		);
	};
	render = () => {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon title="Cập nhật tài khoản" actionLeft={this.props.navigation.goBack} />
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
							<TextPoppin style={styles.title}>Họ tên</TextPoppin>

							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_name()}</View>
							</View>
							<TextPoppin style={styles.title}>Địa chỉ</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_address()}</View>
							</View>
							<View>
								<TextPoppin style={styles.title}>Email</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_email()}</View>
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
		updateAccountReducer: state.updateAccountReducer
	};
}

export default connect(mapStateToProps, { setUserInfoAction, updateAccountAction })(Account);

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
