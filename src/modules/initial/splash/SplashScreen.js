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
			this._goMain();
		} else {
			this._goLogin();
		}
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

	componentWillReceiveProps({ checkSessionRes }) {
		if (checkSessionRes.isError) {
			this._goLogin();
		} else {
			if (checkSessionRes.data) {
				this._goMain();
			}
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

	render() {
		return (
			<MView statusbarColor={'white'}>
				<View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}>
					<View style={{ flex: 1 }} />
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
		// checkSessionRes: state.CheckSession
	};
}

export default connect(mapStateToProps, { checkSession })(SplashScreen);
