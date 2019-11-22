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
import { Styles as Style } from '../../../Utilities/Styles';
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

import { actionCloseLoanAction } from '../../../redux-saga/actionCloseLoan';
import { getMoneyLoanCloseAction } from '../../../redux-saga/moneyLoanClose';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../../../components/customize/Table';
import { TextInput } from 'react-native-gesture-handler';
import MButtonSubmit from '../../../components/customize/MButtonSubmit';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const BORDER_RADIUS = 10;
const retangle_left = require('../../../assets/icons/retangle_left.png');
const retangle_right = require('../../../assets/icons/retangle_right.png');
class LoanClose extends React.Component {
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
			OtherMoney: '0',
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
		this.getMoneyLoanCloseAction(this.state.strCloseDate);
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
		if (this.props.getMoneyLoanCloseReducer.isSuccess) {
			if (this.props.getMoneyLoanCloseReducer != PrevProps.getMoneyLoanCloseReducer) {
				this.setState({
					strCloseDate: Utilities.instance().dateDDMMYYYY(this.props.getMoneyLoanCloseReducer.data.CloseDate),
					close_date: new Date(this.props.getMoneyLoanCloseReducer.data.CloseDate)
				});
			}
		}
		if (this.props.actionCloseLoanReducer != PrevProps.actionCloseLoanReducer) {
			if (this.props.actionCloseLoanReducer.isSuccess) {
				showMessage({
					message: this.props.actionCloseLoanReducer.message,
					// description: 'Đóng lãi thành công',
					type: 'success',
					icon: 'success'
				});
				this.state.onRefreshContracts();
				this.getMoneyLoanCloseAction();
				setTimeout(() => {
					this.props.navigation.navigate('pawn');
				}, 2000);
			}
			if (this.props.actionCloseLoanReducer.isError) {
				showMessage({
					message: this.props.actionCloseLoanReducer.message,
					type: 'danger',
					icon: 'danger'
				});
				this.getMoneyLoanCloseAction();
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
	toggleStartDatePicker = (time) => {
		this.setState({ isVisibleStartDatePicker: !this.state.isVisibleStartDatePicker });
	};
	handleStartDatePicker = (time) => {
		var temp = new Date(time);
		var strCloseDate = Utilities.instance().dateDDMMYYYY(temp);
		this.setState(
			{
				strCloseDate,
				isVisibleStartDatePicker: !this.state.isVisibleStartDatePicker,
				close_date: temp
			},
			() => {
				this.getMoneyLoanCloseAction(strCloseDate);
			}
		);
	};

	getMoneyLoanCloseAction = (StrToDate) => {
		this.props.getMoneyLoanCloseAction(this.state.item.ID, StrToDate);
	};
	onChangeOtherMoney = (text) => {
		if (text[0] == '0') {
			this.setState({
				OtherMoney: Utilities.instance().spend_dot_number(text.substring(1))
			});
		} else if (text == 0) {
			this.setState({
				OtherMoney: Utilities.instance().spend_dot_number(text)
			});
		} else {
			this.setState({
				OtherMoney: Utilities.instance().spend_dot_number(text)
			});
		}
		if (text.length == 0) {
			this.setState({ OtherMoney: '0' });
		}
	};
	action_loan_close = () => {
		if (this.props.actionCloseLoanReducer.isLoading && !this.props.getMoneyLoanCloseReducer.isSuccess) {
		} else {
			var body = {
				LoanID: this.state.item.ID,
				strCloseDate: this.state.strCloseDate,
				OtherMoney: this.state.OtherMoney,
				PayNeed:
					this.props.getMoneyLoanCloseReducer.data.TotalInterest +
					this.props.getMoneyLoanCloseReducer.data.TotalMoneyCurrent +
					parseInt(this.state.OtherMoney),
				TotalInterest: this.props.getMoneyLoanCloseReducer.data.TotalInterest
			};
			this.props.actionCloseLoanAction(body);
		}
	};
	_view_tat_toan(item) {
		return item ? (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={styles.view_filter}>
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
								Ngày chuộc đồ *
							</TextHelvetica>
							<TouchableOpacity onPress={this.toggleStartDatePicker} style={styles.button_chose_code}>
								<Image
									source={ic_calendar_2}
									style={{
										height: 20 * Config.ratioHeight,
										width: 20 * Config.ratioHeight
									}}
									resizeMode="contain"
								/>
								{this.state.strCloseDate ? (
									<TextHelvetica style={[ Style.text_style_bold ]}>
										{this.state.strCloseDate}
									</TextHelvetica>
								) : (
									<TextHelvetica style={[ Style.text_style_normal, { color: '#B2B2B2' } ]}>
										Chọn thời gian
									</TextHelvetica>
								)}
							</TouchableOpacity>
						</View>
						{this._view_key_value_salary('Tiền cầm', item.TotalMoneyCurrent)}
						{this._view_key_value_salary('Nợ cũ', item.DebitMoney)}
						{this._view_key_value_salary('Tiền lãi', item.TotalInterest)}
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>Tiền khác *</TextHelvetica>
							<TextInput
								value={Utilities.instance().add_dot_number(this.state.OtherMoney)}
								maxLength={15}
								keyboardType="numeric"
								onChangeText={this.onChangeOtherMoney}
								style={[ styles.button_chose_code, { textAlign: 'right' } ]}
							/>
						</View>
						{this._view_key_value_salary(
							'Tổng tiền chuộc',
							item.TotalInterest + item.TotalMoneyCurrent + parseInt(this.state.OtherMoney)
						)}
					</View>
					<View style={{ padding: 20 }}>
						{!this.props.actionCloseLoanReducer.isLoading ? (
							<MButtonSubmit onPress={this.action_loan_close} text="Chuộc đồ" />
						) : (
							<ActivityIndicator size="large" />
						)}
					</View>
				</MShadowView>
			</View>
		) : null;
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
						<TextHelvetica style={{ fontSize: 18, color: Style.textColorGray }}>Chuộc đồ</TextHelvetica>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<AnimatedScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.props.getMoneyLoanCloseReducer.isLoading}
								onRefresh={this.getMoneyLoanCloseReducer}
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
						{/* <View style={{ height: NAVBAR_HEIGHT }} /> */}
						{this._view_tat_toan(this.props.getMoneyLoanCloseReducer.data)}
					</AnimatedScrollView>
				</View>
				<DateTimePicker
					cancelTextIOS={'Huỷ'}
					confirmTextIOS={'Xác nhận'}
					titleIOS={'Chọn ngày giờ'}
					is24Hour={true}
					mode={'date'}
					date={new Date(this.state.close_date)}
					hideDateTimePicker={this.toggleStartDatePicker}
					handleDateTimePicker={this.handleStartDatePicker}
					isVisible={this.state.isVisibleStartDatePicker}
					minimumDate={new Date(new Date().getTime())}
					// maximumDate={new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000)}
				/>
				<DropdownAlert tapToCloseEnabled ref={(ref) => (this.dropDownAlertRef = ref)} />
				<FlashMessage hideStatusBar position="top" />
			</MView>
		);
	}
}
function mapStateToProps(state) {
	return {
		getMoneyLoanCloseReducer: state.getMoneyLoanCloseReducer,
		actionCloseLoanReducer: state.actionCloseLoanReducer
	};
}

export default connect(mapStateToProps, {
	getMoneyLoanCloseAction,
	actionCloseLoanAction
})(LoanClose);
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
