import React from 'react';
import { Animated, Platform, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import MView from '../../../components/customize/MView';
import { Styles as Style } from '../../../Utilities/Styles';
import { TextHelvetica } from '../../../components/customize/MText';
import MButton from '../../../components/customize/MButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

import Utilities from '../../../Utilities/Utilities';
import HTML from 'react-native-render-html/src/HTML';
import { connect } from 'react-redux';
import MShadowView from '../../../components/customize/MShadowView';
import { Config } from '../../../Utilities/Config';
const ic1 = require('../../../assets/icons/ic_nav_home_active.png');
import Image from 'react-native-fast-image';
const NAVBAR_HEIGHT = 64;
const pay_interest = 'Đóng tiền lãi';
const pay_down_original = 'Trả bớt gốc';
const borrow_more = 'Vay thêm';
const renew = 'Gia hạn';
const loan_close = 'Chuộc đồ';
const debit = 'Nợ';
const photo = 'Chứng từ';
const history = 'Lịch sử';
const deferred_payment_history = 'Lịch sử trả chậm';
const timer = 'Hẹn giờ';

class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			item: this.props.navigation.state.params ? this.props.navigation.state.params.item : undefined,
			type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined,
			onRefreshContracts: this.props.navigation.state.params
				? this.props.navigation.state.params.onRefreshContracts
				: undefined,
			isPushScreen: false
		};
	}
	_button_go_screen(title) {
		var ic;
		var isHide = false;
		var action = () => {};
		switch (title) {
			case pay_interest:
				ic = 'money-bill-alt';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('PayInterest', { item: this.state.item });
					});
				};
				break;
			case pay_down_original:
				ic = 'money-bill-alt';
				// isHide = true;
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('LoanExtraPayDownOrigin', { item: this.state.item });
					});
				};
				break;
			case borrow_more:
				ic = 'money-bill-alt';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('LoanExtraBorrowMore', { item: this.state.item });
					});
				};
				break;
			case renew:
				ic = 'money-bill-alt';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('Extention', { item: this.state.item });
					});
				};
				break;
			case loan_close:
				ic = 'motorcycle';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('LoanClose', {
							item: this.state.item,
							onRefreshContracts: this.state.onRefreshContracts
						});
					});
				};
				break;
			case debit:
				ic = 'credit-card';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('DebitMoney', {
							item: this.state.item,
							onRefreshContracts: this.state.onRefreshContracts
						});
					});
				};
				break;
			case photo:
				ic = 'images';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('photo');
					});
				};
				break;
			case history:
				ic = 'history';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('history');
					});
				};
				break;
			case deferred_payment_history:
				ic = 'history';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('deferred_payment_history');
					});
				};
				break;
			case timer:
				ic = 'alarm-clock';
				action = () => {
					this.setState({ isPushScreen: true }, () => {
						this.props.navigation.navigate('timer');
					});
				};
				break;
		}
		return isHide ? null : (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL / 2, marginBottom: -3 }}>
				<MShadowView style={styles.button_go_screen}>
					<TouchableOpacity
						style={{
							flexDirection: 'row',
							height: 45 * Config.ratioHeight,
							alignItems: 'center',
							padding: 10
						}}
						onPress={() => action()}
					>
						<FontAwesome5Pro name={ic} color={Style.primaryColor} size={25} />
						<View style={{ flex: 1, marginLeft: 10 }}>
							<TextHelvetica style={[ Style.text_style_normal, { fontSize: Config.textSizeNormal } ]}>
								{title}
							</TextHelvetica>
						</View>
						<FontAwesome5Pro color="#888" name="arrow-circle-right" size={20} />
					</TouchableOpacity>
				</MShadowView>
			</View>
		);
	}
	render() {
		return (
			<MView style={{ backgroundColor: Style.backgroundColorHome }} statusbarColor={'white'}>
				<View style={[ styles.navbar ]}>
					<View style={[ styles.toolbar ]}>
						<MButton
							onPress={this.props.navigation.pop}
							style={{ width: 80, height: 50, justifyContent: 'center', alignItems: 'center' }}
						>
							<MaterialIcons name="arrow-back" size={30} />
						</MButton>
						<TextHelvetica style={{ fontSize: 18, color: Style.textColorGray }}>Menu</TextHelvetica>
					</View>
				</View>
				<ScrollView style={{ flex: 1 }}>
					<View>
						{this._button_go_screen(pay_interest)}
						{this._button_go_screen(pay_down_original)}
						{this._button_go_screen(borrow_more)}
						{this._button_go_screen(renew)}
						{this._button_go_screen(loan_close)}
						{this._button_go_screen(debit)}
						{this._button_go_screen(photo)}
						{this._button_go_screen(history)}
						{this._button_go_screen(deferred_payment_history)}
						{this._button_go_screen(timer)}

						<View style={{ height: 20 }} />
					</View>
				</ScrollView>
			</MView>
		);
	}
}
function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {})(Menu);
const styles = StyleSheet.create({
	button_go_screen: {
		borderRadius: 3
	},
	fill: {
		flex: 1
	},
	navbar: {
		top: 0,
		left: 0,
		right: 0,
		height: NAVBAR_HEIGHT,
		justifyContent: 'center',
		backgroundColor: Style.backgroundColorHome
	},
	contentContainer: {
		paddingTop: NAVBAR_HEIGHT
	},
	toolbar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	item: {
		marginLeft: 10,
		marginRight: 10,
		elevation: 3,
		shadowColor: '#969696',
		shadowOffset: { width: 1, height: 3 },
		shadowOpacity: 0.4,
		backgroundColor: 'white',
		borderRadius: 5,
		marginTop: 3,
		marginBottom: 10,
		flex: 1
	},
	itemBox: {
		flexDirection: 'row',
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 10,
		paddingBottom: 10
	},
	itemBoxHeader: {
		flexDirection: 'row',
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: Style.backgroundColorHome,
		height: 100
	},
	itemBoxTextRight: {
		color: Style.textColor,
		fontSize: 15
	},
	itemBoxTextLeft: {
		color: Style.textColor,
		fontSize: 15,
		flex: 1,
		textAlign: 'right',
		fontWeight: 'normal'
	},
	itemBoxTextLeftBold: {
		color: Style.textColor,
		fontSize: 15,
		flex: 1,
		textAlign: 'right',
		fontWeight: 'bold'
	},
	title: {
		margin: 10,
		fontWeight: 'bold',
		fontSize: 18,
		color: Style.textColor
	},
	status: {
		backgroundColor: 'gray',
		width: 120,
		height: 30,
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemBoxStatus: {
		flexDirection: 'row',
		paddingLeft: 12,
		paddingRight: 12,
		alignItems: 'center'
	}
});
