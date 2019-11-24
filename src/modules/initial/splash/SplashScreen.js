import React from 'react';
import { View } from 'react-native';
import MView from '../../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../../Utilities/Config';
import { NavigationActions, StackActions } from 'react-navigation';
import codePush from 'react-native-code-push';
import LinearGradient from 'react-native-linear-gradient';
import { TextHSPC } from '../../../components/customize/MText';
import { Styles } from '../../../Utilities/Styles';
import ProgressCircle from 'react-native-progress-circle';
import { connect } from 'react-redux';
import { checkSession, login } from '../../../redux-saga/Action';
import MAsyncStorage from '../../../Utilities/MAsyncStorage';
import { Constant } from '../../../Utilities/Constant';
import { setUserInfoAction } from '../../../redux-saga/userInfo';
import { checkTokenAction } from '../../../redux-saga/checkToken';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';

class SplashScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0
		};
	}

	checkUserInfo = async () => {
		const user = await MAsyncStorage.getUserInfo();
		console.log(user);
		if (user) {
			this.props.checkTokenAction();
		} else {
			this.goProduct();
		}
	};
	componentDidUpdate(PrevProps) {
		if (this.props.checkTokenReducer != PrevProps.checkTokenReducer) {
			if (this.props.checkTokenReducer.isSuccess) {
				if (this.props.checkTokenReducer.data.user.role_id == 1) {
					this.startMainAdmin();
				} else {
					this._goMain();
				}
				this.props.setUserInfoAction(this.props.checkTokenReducer.data);
				MAsyncStorage.setUserInfo(this.props.checkTokenReducer.data);
			}
			if (this.props.checkTokenReducer.isError) {
				this.goProduct();
			}
		}
	}

	startMainAdmin = () => {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'mainAdmin' }) ]
			})
		);
	};
	componentDidMount() {
		this.checkUserInfo();
		// this.checkCodePushFinish();
		// codePush.sync({
		//     updateDialog: false,
		//     installMode: codePush.InstallMode.IMMEDIATE
		// }, this.onSyncStatusChange, this.onDownloadProgress, this.onError);
		Constant.navigation = this.props.navigation;
	}

	onSyncStatusChange = (status) => {
		switch (status) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				console.log('app', 'Checking for updates.');
				break;
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				console.log('app', 'Downloading package.');
				break;
			case codePush.SyncStatus.INSTALLING_UPDATE:
				console.log('app', 'Installing update.');
				break;
			case codePush.SyncStatus.UP_TO_DATE:
				this.checkCodePushFinish();
				console.log('app', 'Up-to-date.');
				break;
			case codePush.SyncStatus.UPDATE_INSTALLED:
				this.checkCodePushFinish();
				console.log('app', 'Update installed.');
				break;
		}
	};

	onDownloadProgress = (progress) => {
		if (progress) {
			let percentage = progress.receivedBytes / progress.totalBytes * 100;
			this.setState({ progress: parseInt(percentage) });
		}
	};

	onError = function(error) {
		console.log('An error occurred. ' + error);
	};

	async checkCodePushFinish() {
		const user = await MAsyncStorage.getUserInfo();
		if (user) {
			this.props.checkSession();
		} else {
			this._goLogin();
		}
	}

	_goLogin() {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'LoginScreen' }) ]
			})
		);
	}

	_goMain() {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'main' }) ]
			})
		);
	}
	goProduct() {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'Product' }) ]
			})
		);
	}

	render() {
		return (
			<MView statusbarColor={'white'}>
				<View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}>
					<View style={{ flex: 1 }} />
				</View>
				<View style={styles.containLogo}>
					<FastImage style={styles.logo} source={require('../../../assets/images/logo_login.png')} />
				</View>
				<View style={{ margin: 100 }}>
					<ActivityIndicator size="large" color={Styles.primaryColor} />
				</View>

				{this.state.progress > 0 ? (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<ProgressCircle
							percent={this.state.progress}
							radius={90}
							borderWidth={3}
							color="#bababa"
							shadowColor="#ffffff"
							bgColor="#ffffff"
						>
							<TextHSPC style={{ fontSize: 32, color: Styles.primaryColor, fontWeight: 'bold' }}>
								{this.state.progress} %
							</TextHSPC>
						</ProgressCircle>
						<TextHSPC style={{ fontSize: 18, color: 'white', marginTop: 20 }}>
							Đang tải phiên bản mới...
						</TextHSPC>
					</View>
				) : (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
				)}
			</MView>
		);
	}
}

function mapStateToProps(state) {
	return {
		checkTokenReducer: state.checkTokenReducer
	};
}

export default connect(mapStateToProps, { checkSession, setUserInfoAction, checkTokenAction })(SplashScreen);
