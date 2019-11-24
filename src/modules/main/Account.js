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
import { deleteUserInfoAction } from '../../redux-saga/userInfo';
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
		// MAsyncStorage.clearAll();
		// this.props.deleteUserInfoAction();
		this.state = {
			account: this.props.userInfoReducer.data ? this.props.userInfoReducer.data.user : null
		};
	}

	goLogin = () => {
		this.props.navigation.pop();
	};
	componentDidUpdate(PrevProps) {
		console.log(this.props.userInfoReducer);
		console.log('this.props.userInfoReducer');
		if (this.props.userInfoReducer != PrevProps.userInfoReducer) {
			this.setState({ account: this.props.userInfoReducer.data ? this.props.userInfoReducer.data.user : null });
		}
	}

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
	onChangeUsername = (text) => {
		this.setState({
			username: text
		});
	};
	onChangeName = (text) => {
		this.setState({
			name: text
		});
	};
	onChangeEmail = (text) => {
		this.setState({
			email: text
		});
	};
	onChangeAddress = (text) => {
		this.setState({
			address: text
		});
	};
	onChangePhone = (text) => {
		this.setState({
			phone: text
		});
	};
	view_input_username() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						editable={false}
						value={this.state.account.username}
						placeholder="Nhập tên đăng nhập"
						onChangeText={this.onChangeUsername}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						editable={false}
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
						editable={false}
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
						editable={false}
						value={this.state.account.address}
						placeholder="Nhập địa chỉ"
						onChangeText={this.onChangeAddress}
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
						placeholder="Nhập mật khẩu"
						secureTextEntry
						onChangeText={this.onChangePassword}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_phone() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						editable={false}
						value={this.state.account.phone}
						maxLength={13}
						placeholder="Nhập số điện thoại"
						keyboardType="numeric"
						onChangeText={this.onChangePhone}
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
						placeholder="Nhập lại mật khẩu"
						secureTextEntry
						onChangeText={this.onChangeRePassword}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	goEdit = () => {
		this.props.navigation.navigate('AccountEdit', { account: this.state.account });
	};
	goChangePass = () => {
		this.props.navigation.navigate('ChangePass', { account: this.state.account });
	};
	logout = () => {
		this.alert.showAlert(
			`Bạn có chắc muốn đăng xuất`,
			() => {
				MAsyncStorage.clearAll();
				this.props.deleteUserInfoAction();
				this.props.navigation.dispatch(
					StackActions.reset({
						index: 0,
						// actions: [ NavigationActions.navigate({ routeName: 'LoginScreen' }) ]
						actions: [ NavigationActions.navigate({ routeName: 'Product' }) ]
					})
				);
			},
			() => {}
		);
	};
	render() {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon disableLeft title="Tài khoản" />
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						{this.state.account && (
							<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
								<View
									style={{
										justifyContent: 'space-between',
										flexDirection: 'row',
										alignItems: 'flex-end'
									}}
								>
									<TextPoppin style={styles.title}>Họ tên</TextPoppin>
									<TouchableOpacity onPress={this.goEdit}>
										<FastImage
											source={pencil}
											style={{ width: 40, height: 40, marginBottom: 8 }}
											resizeMode="contain"
										/>
									</TouchableOpacity>
								</View>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_name()}</View>
								</View>
								<TextPoppin style={styles.title}>Số điện thoại</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_phone()}</View>
								</View>
								<TextPoppin style={styles.title}>Tên đăng nhập</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_username()}</View>
								</View>
								<TextPoppin style={styles.title}>Địa chỉ</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_address()}</View>
								</View>
								{this.state.account.email && this.state.account.email !== '' ? (
									<View>
										<TextPoppin style={styles.title}>Email</TextPoppin>
										<View
											style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}
										>
											<View style={{ flex: 3 }}>{this.view_input_email()}</View>
										</View>
									</View>
								) : null}
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<TextPoppin
										onPress={this.logout}
										style={[
											styles.title,
											{ color: 'red', textAlign: 'center', marginTop: 50, opacity: 0.5, flex: 1 }
										]}
									>
										Đăng xuất
									</TextPoppin>
									<TextPoppin
										onPress={this.goChangePass}
										style={[
											styles.title,
											{ color: 'red', textAlign: 'center', marginTop: 50, opacity: 0.5, flex: 1 }
										]}
									>
										Đổi mật khẩu
									</TextPoppin>
								</View>
							</View>
						)}
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
		userInfoReducer: state.userInfoReducer
	};
}

export default connect(mapStateToProps, { deleteUserInfoAction })(Account);

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
