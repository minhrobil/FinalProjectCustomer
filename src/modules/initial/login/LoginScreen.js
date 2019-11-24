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
import { setUserInfoAction } from '../../../redux-saga/userInfo';

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
			isOrder: this.props.navigation.state.params ? this.props.navigation.state.params.isOrder : false
		};
	}

	_submit = () => {
		if (this.state.username && this.state.password) {
			this.props.login(this.state.username, this.state.password);
		} else {
			if (this.state.username == '') {
				this.alert.showAlert(`Bạn phải nhập tên đăng nhập`, () => {});
			} else if (this.state.password == '') {
				this.alert.showAlert(`Bạn phải nhập mật khẩu`, () => {});
			}
		}
	};
	goSingin = () => {
		this.props.navigation.navigate('SigninScreen');
	};
	async componentDidMount() {}
	componentWillReceiveProps({ loginRes }) {
		if (loginRes.isError) {
			this.alert.showAlert(loginRes.message ? loginRes.message : 'Có lỗi xảy ra!', () => {});
		} else {
			if (loginRes.isSuccess) {
				this.props.setUserInfoAction(loginRes.data);
				if (loginRes.data.user.role_id == 1) {
					this.startMainAdmin();
				} else {
					this.startMain();
				}
			}
		}
	}
	startMain = () => {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'main' }) ]
			})
		);
	};
	startMainAdmin = () => {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'mainAdmin' }) ]
			})
		);
	};
	componentDidUpdate(PrevProps) {}
	onChangePassword = (text) => {
		this.setState({
			password: text
		});
	};
	onChangeUsername = (text) => {
		this.setState({
			username: text
		});
	};
	view_input_username() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.username}
						placeholder="Nhập tên đăng nhập"
						onChangeText={this.onChangeUsername}
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
				{this.props.loginRes.isLoading ? (
					<ActivityIndicator size="large" color={Style.primaryColor} />
				) : (
					<MShadowView style={styles.mview_submit}>
						<TouchableOpacity onPress={this._submit} style={styles.btnLogin}>
							<FastImage
								style={styles.button_submit}
								source={require('../../../assets/images/button_submit.png')}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</MShadowView>
				)}
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
							<TextPoppin style={styles.title}>Tên đăng nhập</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_username()}</View>
							</View>
							<TextPoppin style={styles.title}>Mật khẩu</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_input_password()}</View>
							</View>
							{this.view_submit()}
							<TextPoppin
								onPress={this.goSingin}
								style={[ styles.title, { color: '#656565', textAlign: 'center', margin: 20 } ]}
							>
								Không có tài khoản? Đăng ký ngay
							</TextPoppin>
							{this.state.isOrder && (
								<TextPoppin
									onPress={() => this.props.navigation.goBack()}
									style={[ styles.title, { color: '#656565', textAlign: 'center', margin: 20 } ]}
								>
									Quay lại giỏ hàng
								</TextPoppin>
							)}
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

export default connect(mapStateToProps, { login, setUserInfoAction })(LoginScreen);
