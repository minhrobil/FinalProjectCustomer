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
import { signupAction } from '../../../redux-saga/signup';
import { connect } from 'react-redux';
import MAsyncStorage from '../../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../../components/customize/MShadowView';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			re_password: '',
			name: '',
			email: '',
			phone: '',
			address: ''
		};
	}

	_submit = () => {
		const { username, password, re_password, name, email, phone, address } = this.state;

		this.alert.showAlert(
			`Xác nhận đăng ký tài khoản`,
			() => {
				setTimeout(() => {
					if (
						this.state.username &&
						this.state.password &&
						this.state.re_password &&
						this.state.re_password == this.state.password &&
						this.state.name &&
						this.state.phone
					) {
						var body = {
							username,
							password,
							name,
							email,
							phone,
							address
						};
						this.props.signupAction(body);
					} else {
						if (this.state.username == '') {
							this.alert.showAlert(`Bạn phải nhập tài khoản`, () => {});
						} else if (this.state.password == '') {
							this.alert.showAlert(`Bạn phải nhập mật khẩu`, () => {});
						} else if (this.state.re_password == '') {
							this.alert.showAlert(`Bạn phải nhập lại mật khẩu`, () => {});
						} else if (this.state.re_password != this.state.password) {
							this.alert.showAlert(`Mật khẩu không khớp`, () => {});
						} else if (this.state.name == '') {
							this.alert.showAlert(`Bạn phải nhập họ tên`, () => {});
						} else if (this.state.phone == '') {
							this.alert.showAlert(`Bạn phải nhập số điện thoại`, () => {});
						}
					}
				}, 500);
			},
			() => {}
		);
	};

	goLogin = () => {
		this.props.navigation.pop();
	};
	componentDidUpdate(PrevProps) {
		if (this.props.signupReducer != PrevProps.signupReducer) {
			if (this.props.signupReducer.isError) {
				this.alert.showAlert(
					this.props.signupReducer.message ? this.props.signupReducer.message : 'Có lỗi xảy ra!',
					() => {}
				);
			}
			if (this.props.signupReducer.isSuccess) {
				this.alert.showAlert(this.props.signupReducer.message, () => {
					this.props.navigation.dispatch(
						StackActions.reset({
							index: 0,
							actions: [ NavigationActions.navigate({ routeName: 'main' }) ]
						})
					);
				});
			}
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
						value={this.state.username}
						placeholder="Nhập tài khoản"
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
						value={this.state.name}
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
						value={this.state.email}
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
						value={this.state.address}
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
			<View
				style={{
					width: 75,
					height: 75,
					alignSelf: 'center',
					marginTop: 30
				}}
			>
				<MShadowView style={styles.mview_submit}>
					{this.props.signupReducer.isLoading ? (
						<ActivityIndicator size="large" color={Style.primaryColor} />
					) : (
						<TouchableOpacity onPress={this._submit} style={styles.btnLogin}>
							<FastImage
								style={styles.button_submit}
								source={require('../../../assets/images/button_submit.png')}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					)}
				</MShadowView>
			</View>
		);
	};
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
						value={this.state.phone}
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
	render() {
		return (
			<MView statusbarColor={'white'}>
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						<View style={styles.containLogo}>
							<FastImage style={styles.logo} source={require('../../../assets/images/logo_login.png')} />
						</View>
						{/* <View style={{ height: Config.heightDevice * 0.1 }} /> */}
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
							<TextPoppin style={styles.title}>Họ tên *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_name()}</View>
							</View>
							<TextPoppin style={styles.title}>Số điện thoại *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_phone()}</View>
							</View>
							<TextPoppin style={styles.title}>Tài khoản *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_username()}</View>
							</View>
							<TextPoppin style={styles.title}>Mật khẩu *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_input_password()}</View>
							</View>
							<TextPoppin style={styles.title}>Nhập lại mật khẩu *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_input_re_password()}</View>
							</View>
							<TextPoppin style={styles.title}>Địa chỉ *</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_address()}</View>
							</View>
							<TextPoppin style={styles.title}>Email</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_email()}</View>
							</View>

							{this.view_submit()}

							<TextPoppin
								onPress={this.goLogin}
								style={[ styles.title, { color: '#656565', textAlign: 'center', margin: 20 } ]}
							>
								Quay lại đăng nhập
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
		signupReducer: state.signupReducer
	};
}

export default connect(mapStateToProps, { signupAction })(LoginScreen);
