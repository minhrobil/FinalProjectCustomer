import React from 'react';
import {
	Animated,
	RefreshControl,
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import MView from '../../../components/customize/MView';
import { Styles as Style, Styles } from '../../../Utilities/Styles';
import { TextHelvetica } from '../../../components/customize/MText';
import MButton from '../../../components/customize/MButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import SwitchSelector from 'react-native-switch-selector';
import Utilities from '../../../Utilities/Utilities';
import HTML from 'react-native-render-html/src/HTML';
import { connect } from 'react-redux';
import MShadowView from '../../../components/customize/MShadowView';
import { Config } from '../../../Utilities/Config';
const ic1 = require('../../../assets/icons/ic_nav_home_active.png');
import Image from 'react-native-fast-image';
const NAVBAR_HEIGHT = 64;
import OneLine from '../../../components/customize/OneLine';
const ic_square = require('../../../assets/icons/ic_square.png');
const ic_check_square = require('../../../assets/icons/ic_check_square.png');
const ic_calendar_2 = require('../../../assets/icons/ic_calendar_2.png');
const ic_calendar = require('../../../assets/icons/ic_calendar.png');
import DateTimePicker from '../../../components/customize/DateTimePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import DropdownAlert from 'react-native-dropdownalert';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

import { payDebitMoneyAction } from '../../../redux-saga/payDebitMoney';
import { getContractDetailAction } from '../../../redux-saga/contractDetail';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../../../components/customize/Table';
import { TextInput } from 'react-native-gesture-handler';
import MButtonSubmit from '../../../components/customize/MButtonSubmit';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const BORDER_RADIUS = 10;
const retangle_left = require('../../../assets/icons/retangle_left.png');
const retangle_right = require('../../../assets/icons/retangle_right.png');
class DebitMoney extends React.Component {
	_clampedScrollValue = 0;
	_offsetValue = 0;
	_scrollValue = 0;
	constructor(props) {
		super(props);
		const scrollAnim = new Animated.Value(0);
		const offsetAnim = new Animated.Value(0);
		this.state = {
			scrollAnim,
			offsetAnim,
			clampedScroll: Animated.diffClamp(
				Animated.add(
					scrollAnim.interpolate({
						inputRange: [ 0, 1 ],
						outputRange: [ 0, 1 ],
						extrapolateLeft: 'clamp'
					}),
					offsetAnim
				),
				0,
				NAVBAR_HEIGHT
			),
			DebitMoney1: '0',
			DebitMoney2: '0',
			filter: 0,
			isVisibleStartDatePicker: false,
			close_date: new Date(),
			strCloseDate: Utilities.instance().dateDDMMYYYY(new Date()),
			item: this.props.navigation.state.params ? this.props.navigation.state.params.item : undefined,
			type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined,
			onRefreshContracts: this.props.navigation.state.params
				? this.props.navigation.state.params.onRefreshContracts
				: undefined
		};
	}
	componentDidMount() {
		this.state.scrollAnim.addListener(({ value }) => {
			const diff = value - this._scrollValue;
			this._scrollValue = value;
			this._clampedScrollValue = Math.min(Math.max(this._clampedScrollValue + diff, 0), NAVBAR_HEIGHT);
		});
		this.state.offsetAnim.addListener(({ value }) => {
			this._offsetValue = value;
		});
	}
	componentDidUpdate(PrevProps, PrevState) {
		if (this.props.payDebitMoneyReducer != PrevProps.payDebitMoneyReducer) {
			if (this.props.payDebitMoneyReducer.isSuccess) {
				showMessage({
					message: this.props.payDebitMoneyReducer.message,
					// description: 'Đóng lãi thành công',
					type: 'success',
					icon: 'success'
				});
				this.props.getContractDetailAction(this.state.item.ID);
				this.setState({ DebitMoney1: '0', DebitMoney2: '0' });
			}
			if (this.props.payDebitMoneyReducer.isError) {
				showMessage({
					message: this.props.payDebitMoneyReducer.message,
					type: 'danger',
					icon: 'danger'
				});
			}
		}
	}
	componentWillUnmount() {
		this.state.scrollAnim.removeAllListeners();
		this.state.offsetAnim.removeAllListeners();
	}
	_onScrollEndDrag = () => {
		this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
	};
	_onMomentumScrollBegin = () => {
		clearTimeout(this._scrollEndTimer);
	};
	_onMomentumScrollEnd = () => {
		const toValue =
			this._scrollValue > NAVBAR_HEIGHT && this._clampedScrollValue > NAVBAR_HEIGHT / 2
				? this._offsetValue + NAVBAR_HEIGHT
				: this._offsetValue - NAVBAR_HEIGHT;

		Animated.timing(this.state.offsetAnim, {
			toValue,
			duration: 350,
			useNativeDriver: true
		}).start();
	};

	_switch = (value) => {
		this.setState({ filter: value });
		this.page = 1;
	};

	onChangeDebitMoney1 = (text) => {
		if (text[0] == '0') {
			this.setState({
				DebitMoney1: Utilities.instance().spend_dot_number(text.substring(1))
			});
		} else if (text == 0) {
			this.setState({
				DebitMoney1: Utilities.instance().spend_dot_number(text)
			});
		} else {
			this.setState({
				DebitMoney1: Utilities.instance().spend_dot_number(text)
			});
		}
		if (text.length == 0) {
			this.setState({ DebitMoney1: '0' });
		}
	};
	onChangeDebitMoney2 = (text) => {
		if (text[0] == '0') {
			this.setState({
				DebitMoney2: Utilities.instance().spend_dot_number(text.substring(1))
			});
		} else if (text == 0) {
			this.setState({
				DebitMoney2: Utilities.instance().spend_dot_number(text)
			});
		} else {
			this.setState({
				DebitMoney2: Utilities.instance().spend_dot_number(text)
			});
		}
		if (text.length == 0) {
			this.setState({ DebitMoney2: '0' });
		}
	};
	onSubmit1 = () => {
		if (this.props.payDebitMoneyReducer.isLoading && !this.props.payDebitMoneyReducer.isSuccess) {
		} else {
			var body = {
				LoanID: this.state.item.ID,
				DebitMoney: this.state.DebitMoney1,
				ActionID: 10
			};
			this.props.payDebitMoneyAction(body);
		}
	};
	onSubmit2 = () => {
		if (this.props.payDebitMoneyReducer.isLoading && !this.props.payDebitMoneyReducer.isSuccess) {
		} else {
			var body = {
				LoanID: this.state.item.ID,
				DebitMoney: this.state.DebitMoney2,
				ActionID: 11
			};
			this.props.payDebitMoneyAction(body);
		}
	};
	no_lai() {
		return (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={styles.view_filter}>
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
								Số tiền nợ lại *
							</TextHelvetica>
							<TextInput
								value={Utilities.instance().add_dot_number(this.state.DebitMoney1)}
								maxLength={15}
								keyboardType="numeric"
								onChangeText={this.onChangeDebitMoney1}
								style={[ styles.button_chose_code, { textAlign: 'right' } ]}
							/>
						</View>
					</View>
					<View style={{ padding: 20 }}>
						{!this.props.payDebitMoneyReducer.isLoading ? (
							<MButtonSubmit onPress={this.onSubmit1} text="Ghi nợ" />
						) : (
							<ActivityIndicator size="large" />
						)}
					</View>
				</MShadowView>
			</View>
		);
	}
	tra_no() {
		return (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={styles.view_filter}>
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
								Số tiền trả nợ *
							</TextHelvetica>
							<TextInput
								value={Utilities.instance().add_dot_number(this.state.DebitMoney2)}
								maxLength={15}
								keyboardType="numeric"
								onChangeText={this.onChangeDebitMoney2}
								style={[ styles.button_chose_code, { textAlign: 'right' } ]}
							/>
						</View>
					</View>
					<View style={{ padding: 20 }}>
						{!this.props.payDebitMoneyReducer.isLoading ? (
							<MButtonSubmit onPress={this.onSubmit2} text="Thanh toán" />
						) : (
							<ActivityIndicator size="large" />
						)}
					</View>
				</MShadowView>
			</View>
		);
	}
	view_origin_money() {
		return (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={[ styles.view_filter, { paddingTop: 10 } ]}>
						{this._view_key_value_salary(
							'Tiền lãi đã đóng',
							this.props.getContractDetailReducer.data.InterestMoneyReceived
						)}
						{this._view_key_value_salary(
							this.props.getContractDetailReducer.data.CustomerDebitMoney > 0
								? 'Nợ cũ khách hàng'
								: 'Tiền thừa khách hàng',
							Math.abs(this.props.getContractDetailReducer.data.CustomerDebitMoney),
							this.props.getContractDetailReducer.data.CustomerDebitMoney > 0
								? Styles.error_color
								: Styles.success_color
						)}
						{this._view_key_value_salary(
							this.props.getContractDetailReducer.data.DebitMoney > 0
								? 'Nợ cũ hợp đồng'
								: 'Tiền thừa hợp đồng',
							Math.abs(this.props.getContractDetailReducer.data.DebitMoney),
							this.props.getContractDetailReducer.data.DebitMoney > 0
								? Styles.error_color
								: Styles.success_color
						)}
					</View>
				</MShadowView>
			</View>
		);
	}
	_view_key_value(key, value) {
		return (
			<View style={styles.view_key_value}>
				<View style={{ flex: 1 }}>
					<TextHelvetica style={Style.text_style_normal}>{key}</TextHelvetica>
				</View>
				<View style={{ flex: 1, paddingHorizontal: 10 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
						<TextHelvetica style={[ Style.text_style_bold, { marginLeft: 10, textAlign: 'right' } ]}>
							{value}
						</TextHelvetica>
					</View>
				</View>
			</View>
		);
	}
	_view_key_value_salary(key, value, textColor) {
		return (
			<View style={styles.view_key_value}>
				<TextHelvetica style={Style.text_style_normal}>{key}</TextHelvetica>
				<View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
					<TextHelvetica style={[ Style.text_style_bold, textColor ? { color: textColor } : {} ]}>
						{Utilities.instance().formatMoney(value)}{' '}
					</TextHelvetica>
					<TextHelvetica
						style={[
							Style.text_style_bold,
							{ textDecorationLine: 'underline' },
							textColor ? { color: textColor } : {}
						]}
					>
						đ
					</TextHelvetica>
				</View>
			</View>
		);
	}
	render() {
		var { clampedScroll } = this.state;
		var navbarTranslate = clampedScroll.interpolate({
			inputRange: [ 0, NAVBAR_HEIGHT ],
			outputRange: [ 0, -NAVBAR_HEIGHT ],
			extrapolate: 'clamp'
		});
		var navbarOpacity = clampedScroll.interpolate({
			inputRange: [ 0, NAVBAR_HEIGHT ],
			outputRange: [ 1, 0 ],
			extrapolate: 'clamp'
		});
		return (
			<MView style={{ backgroundColor: Style.backgroundColorHome }} statusbarColor={'white'}>
				<View style={[ styles.navbar1 ]}>
					<View
						style={[
							styles.toolbar,
							{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }
						]}
					>
						<MButton
							onPress={this.props.navigation.pop}
							style={{ width: 80, height: 50, justifyContent: 'center', alignItems: 'center' }}
						>
							<MaterialIcons name="arrow-back" size={30} />
						</MButton>
						<TextHelvetica style={{ fontSize: 18, color: Style.textColorGray }}>Nợ</TextHelvetica>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<AnimatedScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.props.payDebitMoneyReducer.isLoading}
								onRefresh={this.payDebitMoneyReducer}
							/>
						}
						style={{ flex: 1 }}
						scrollEventThrottle={1}
						onMomentumScrollBegin={this._onMomentumScrollBegin}
						onMomentumScrollEnd={this._onMomentumScrollEnd}
						onScrollEndDrag={this._onScrollEndDrag}
						onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } } ], {
							useNativeDriver: true
						})}
					>
						<View style={{ height: NAVBAR_HEIGHT }} />
						{this.view_origin_money()}

						{this.state.filter == 0 ? this.no_lai() : this.tra_no()}
					</AnimatedScrollView>
					<Animated.View
						style={[
							styles.navbar,
							{
								transform: [ { translateY: navbarTranslate } ]
							}
						]}
					>
						<Animated.View style={[ styles.toolbar, { opacity: navbarOpacity } ]}>
							<SwitchSelector
								initial={0}
								onPress={this._switch}
								textColor={Style.textColor} //'#7a44cf'
								selectedColor={'white'}
								buttonColor={'#FCBE19'}
								borderColor={'#FCBE19'}
								hasPadding
								options={[
									{ label: ' Khách nợ lãi - Trả tiền thừa', value: 0 },
									{ label: 'Khách trả nợ', value: 1 }
								]}
							/>
						</Animated.View>
					</Animated.View>
				</View>
				<DropdownAlert tapToCloseEnabled ref={(ref) => (this.dropDownAlertRef = ref)} />
				<FlashMessage hideStatusBar position="top" />
			</MView>
		);
	}
}
function mapStateToProps(state) {
	return {
		payDebitMoneyReducer: state.payDebitMoneyReducer,
		getContractDetailReducer: state.getContractDetailReducer
	};
}

export default connect(mapStateToProps, {
	payDebitMoneyAction,
	getContractDetailAction
})(DebitMoney);
const styles = StyleSheet.create({
	view_input: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	header: {
		height: 50,
		backgroundColor: Style.backgroundColorHome,
		borderTopLeftRadius: BORDER_RADIUS,
		borderTopRightRadius: BORDER_RADIUS,
		borderWidth: 0
	},
	text_head: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: Config.textSizeNormal,
		color: Style.textColor,
		fontFamily: 'Roboto'
	},
	text: { textAlign: 'center', color: Style.textColor, fontFamily: 'Roboto' },
	dataWrapper: { marginTop: -1 },
	row: { minHeight: 40, borderBottomWidth: 1, borderBottomColor: '#EAEAEA', paddingVertical: 10 },
	view_filter: {
		paddingTop: 10,
		borderRadius: 10,
		backgroundColor: 'white',
		width: '100%',
		alignSelf: 'center',
		paddingHorizontal: 15,
		paddingBottom: 15
	},
	button_chose_code: {
		flex: 1,
		minHeight: 40 * Config.ratioHeight,
		borderRadius: 5,
		backgroundColor: '#F6F6F6',
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 5,
		flexDirection: 'row'
	},
	view_key_value: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		height: 40 * Config.ratioHeight
	},
	button_go_screen: {
		borderRadius: 3
	},
	fill: {
		flex: 1
	},
	navbar: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: NAVBAR_HEIGHT,
		justifyContent: 'center',
		backgroundColor: Style.backgroundColorHome
	},
	navbar1: {
		left: 0,
		right: 0,
		height: NAVBAR_HEIGHT,
		justifyContent: 'center'
		// backgroundColor: Style.backgroundColorHome
	},
	contentContainer: {
		paddingTop: NAVBAR_HEIGHT
	},
	toolbar: {
		marginRight: 10,
		marginLeft: 10,
		flex: 1,
		justifyContent: 'center'
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
		// paddingTop: 10,
		paddingBottom: 10
	},
	itemBoxHeader: {
		flexDirection: 'row',
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: Style.backgroundColorHome
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
