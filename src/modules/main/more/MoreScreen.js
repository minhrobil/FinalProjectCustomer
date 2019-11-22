import React from 'react';
import MView from '../../../components/customize/MView';
import { Styles as Style } from '../../../Utilities/Styles';
import { Animated, Image, Platform, StyleSheet, View, Text, FlatList, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Config } from '../../../Utilities/Config';
import { TextHelvetica } from '../../../components/customize/MText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MButton from '../../../components/customize/MButton';
import MAlert from '../../../components/customize/MAlert';
import { NavigationActions, StackActions } from 'react-navigation';
import MAsyncStorage from '../../../Utilities/MAsyncStorage';
import { ScrollView } from 'react-native-gesture-handler';

export default class MoreScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
	}

	async componentWillMount() {
		const user = await MAsyncStorage.getUserInfo();
		this.setState({ user: user });
	}

	_changePassword() {
		this.alert.showAlert(
			`Chức năng này chưa được cập nhật. Bạn có muốn tiếp thay đổi mật khẩu?`,
			() => {
				Linking.openURL('https://admin.mecash.vn/User/Login').catch((err) =>
					console.error('An error occurred', err)
				);
			},
			() => {}
		);
	}

	_logout() {
		this.alert.showAlert(
			`Bạn có chắc chắn muốn đăng xuất hay không?`,
			() => {
				MAsyncStorage.logout();
				const reset = StackActions.reset({
					index: 0,
					actions: [ NavigationActions.navigate({ routeName: 'splash' }) ]
				});
				this.props.navigation.dispatch(reset);
			},
			() => {}
		);
	}

	render() {
		return (
			<MView style={{ backgroundColor: Style.backgroundColorHome }} statusbarColor={'white'}>
				<ScrollView>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<FastImage
							style={styles.avatar}
							source={require('../../../assets/images/img_avatar_placeholder.png')}
						/>
						<TextHelvetica style={styles.textName}>{this.state.user.FullName}</TextHelvetica>
					</View>
					<View style={{ flex: 1, backgroundColor: 'white' }}>
						<MButton onPress={() => this._changePassword()} style={styles.item}>
							<Ionicons name="ios-key" size={24} color={Style.primaryColor} />
							<TextHelvetica style={styles.itemLabel}>Đổi mật khẩu</TextHelvetica>
						</MButton>
						<View style={{ height: 1, backgroundColor: '#EAEAEA' }} />
						<MButton onPress={() => this._logout()} style={styles.item}>
							<Ionicons name="ios-log-out" size={24} color={Style.primaryColor} />
							<TextHelvetica style={styles.itemLabel}>Đăng xuất</TextHelvetica>
						</MButton>
						<View style={{ height: 1, backgroundColor: '#EAEAEA' }} />
					</View>
				</ScrollView>
				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView>
		);
	}
}

const styles = StyleSheet.create({
	avatar: {
		width: Config.isLandscape ? Config.heightDevice * 0.38 : Config.widthDevice * 0.38,
		height: Config.isLandscape ? Config.heightDevice * 0.38 : Config.widthDevice * 0.38,
		borderRadius: Config.isLandscape ? Config.widthDevice * 0.38 / 2 : Config.widthDevice * 0.38 / 2,
		borderWidth: 1,
		borderColor: Style.primaryColor,
		marginTop: 42
	},
	textName: {
		color: Style.textColor,
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 28
	},
	item: {
		padding: 20,
		flexDirection: 'row'
	},
	itemLabel: {
		marginLeft: 13,
		fontSize: 16,
		color: Style.textColor
	}
});
