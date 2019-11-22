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

const pay_interest = 'Đóng tiền lãi';
const pay_down_original = 'Trả bớt gốc';
const borrow_more = 'Vay thêm';
const renew = 'Gia hạn';
const redeem = 'Chuộc đồ';
const debit = 'Nợ';
const photo = 'Chứng từ';
const history = 'Lịch sử';
const deferred_payment_history = 'Lịch sử trả chậm';
const timer = 'Hẹn giờ';
import { getHistoryPaymentAction } from '../../../redux-saga/historyPayment';
import { getPaymentCustomizeAction } from '../../../redux-saga/paymentCustomize';
import { actionPaymentCustomizeAction } from '../../../redux-saga/actionPaymentCustomize';
import { deletePaymentAction } from '../../../redux-saga/deletePayment';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../../../components/customize/Table';
import { TextInput } from 'react-native-gesture-handler';
import MButtonSubmit from '../../../components/customize/MButtonSubmit';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const BORDER_RADIUS = 10;
const retangle_left = require('../../../assets/icons/retangle_left.png');
const retangle_right = require('../../../assets/icons/retangle_right.png');
class PayInterest extends React.Component {
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
			TotalDays: '',
			timeString: '',
			filter: 0,
			OtherMoney: '0',
			CustomerPay: '0',
			InterestMoney: '0',
			TotalInterest: '0',
			isVisibleStartDatePicker: false,
			to_date: new Date(),
			item: this.props.navigation.state.params ? this.props.navigation.state.params.item : undefined,
			type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined
		};
	}
	componentDidMount() {
		this.getDataCustomize(0, '');
		this.getDataHistoryPayment();
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
		if (this.props.getPaymentCustomizeReducer.isSuccess) {
			if (this.props.getPaymentCustomizeReducer != PrevProps.getPaymentCustomizeReducer) {
				// if (this.state.TotalDays !== this.props.getPaymentCustomizeReducer.data.TotalDays) {
				this.setState({ TotalDays: this.props.getPaymentCustomizeReducer.data.TotalDays.toString() });
				// }
				if (
					this.state.timeString !==
					Utilities.instance().dateDDMMYYYY(this.props.getPaymentCustomizeReducer.data.ToDate)
				) {
					this.setState({
						to_date: this.props.getPaymentCustomizeReducer.data.ToDate,
						timeString: Utilities.instance().dateDDMMYYYY(this.props.getPaymentCustomizeReducer.data.ToDate)
					});
				}
				if (this.state.OtherMoney !== this.props.getPaymentCustomizeReducer.data.OtherMoney) {
					this.setState({ OtherMoney: this.props.getPaymentCustomizeReducer.data.OtherMoney.toString() });
				}
				if (this.state.InterestMoney !== this.props.getPaymentCustomizeReducer.data.InterestMoney) {
					this.setState({
						InterestMoney: this.props.getPaymentCustomizeReducer.data.InterestMoney.toString()
					});
				}
				if (this.state.TotalInterest !== this.props.getPaymentCustomizeReducer.data.TotalInterest) {
					this.setState({
						TotalInterest: this.props.getPaymentCustomizeReducer.data.TotalInterest.toString()
					});
				}
				if (this.state.CustomerPay !== this.props.getPaymentCustomizeReducer.data.CustomerPay) {
					this.setState({
						CustomerPay: this.props.getPaymentCustomizeReducer.data.CustomerPay.toString()
					});
				}
			}
		}
		if (this.props.actionPaymentCustomizeReducer != PrevProps.actionPaymentCustomizeReducer) {
			if (this.props.actionPaymentCustomizeReducer.isSuccess) {
				showMessage({
					message: this.props.actionPaymentCustomizeReducer.message,
					// description: 'Đóng lãi thành công',
					type: 'success',
					icon: 'success'
				});
				this.getDataCustomize();
				this.getDataHistoryPayment();
			}
			if (this.props.actionPaymentCustomizeReducer.isError) {
				showMessage({
					message: this.props.actionPaymentCustomizeReducer.message,
					type: 'danger',
					icon: 'danger'
				});
				this.getDataCustomize();
				this.getDataHistoryPayment();
			}
		}
		if (this.props.deletePaymentReducer != PrevProps.deletePaymentReducer) {
			if (this.props.deletePaymentReducer.isSuccess) {
				showMessage({
					message: this.props.deletePaymentReducer.message,
					type: 'success',
					icon: 'success'
				});
				this.getDataCustomize();
				this.getDataHistoryPayment();
			}
			if (this.props.deletePaymentReducer.isError) {
				showMessage({
					message: this.props.deletePaymentReducer.message,
					type: 'danger',
					icon: 'danger'
				});
				// this.getDataCustomize();
				// this.getDataHistoryPayment();
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
		var timeString = Utilities.instance().dateDDMMYYYY(temp);
		this.setState(
			{
				timeString,
				isVisibleStartDatePicker: !this.state.isVisibleStartDatePicker,
				to_date: time
			},
			() => {
				this.getDataCustomize(0, timeString);
			}
		);
	};
	getDataHistoryPayment = () => {
		this.props.getHistoryPaymentAction(this.state.item.ID);
	};
	getDataCustomize = (TotalDays, StrToDate) => {
		var body = {
			LoanID: this.state.item.ID,
			TotalDays: TotalDays,
			StrToDate: StrToDate
		};
		this.props.getPaymentCustomizeAction(body);
	};
	onChangeDay = (text) => {
		if (text.length == 0) {
			this.setState({ TotalDays: '0' });
		} else {
			if (text[0] == '0') {
				this.setState({ TotalDays: text.substring(1) }, () => {
					this.getDataCustomize(parseInt(text.substring(1)), '');
				});
			} else {
				this.setState({ TotalDays: text }, () => {
					this.getDataCustomize(parseInt(text), '');
				});
			}
		}
	};
	onChangeOtherMoney = (text) => {
		if (text[0] == '0') {
			this.setState({
				OtherMoney: Utilities.instance().spend_dot_number(text.substring(1)),
				TotalInterest: Utilities.instance().add_dot_number(
					this.props.getPaymentCustomizeReducer.data.TotalInterest +
						parseInt(Utilities.instance().spend_dot_number(text.substring(1)))
				),
				CustomerPay:
					this.props.getPaymentCustomizeReducer.data.CustomerPay +
					parseInt(Utilities.instance().spend_dot_number(text.substring(1)))
			});
		} else if (text == 0) {
			this.setState({
				OtherMoney: Utilities.instance().spend_dot_number(text),
				TotalInterest: this.props.getPaymentCustomizeReducer.data.TotalInterest,
				CustomerPay: this.props.getPaymentCustomizeReducer.data.CustomerPay
			});
		} else {
			this.setState({
				OtherMoney: Utilities.instance().spend_dot_number(text),
				TotalInterest: Utilities.instance().add_dot_number(
					this.props.getPaymentCustomizeReducer.data.TotalInterest +
						parseInt(Utilities.instance().spend_dot_number(text))
				),
				CustomerPay:
					this.props.getPaymentCustomizeReducer.data.CustomerPay +
					parseInt(Utilities.instance().spend_dot_number(text))
			});
		}
		if (text.length == 0) {
			this.setState({ OtherMoney: '0' });
		}
	};
	onChangeCustomerPay = (text) => {
		if (text[0] == '0') {
			this.setState({ CustomerPay: Utilities.instance().spend_dot_number(text.substring(1)) });
		} else {
			this.setState({ CustomerPay: Utilities.instance().spend_dot_number(text) });
		}
		if (text.length == 0) {
			this.setState({ CustomerPay: '0' });
		}
	};
	action_payment = () => {
		if (this.props.actionPaymentCustomizeReducer.isLoading) {
		} else {
			var body = {
				txtDongLai_ToDate: Utilities.instance().dateDDMMYYYY(this.state.to_date),
				txtTotalDays: this.state.TotalDays,
				txtDongLai_OtherMoney: this.state.OtherMoney,
				txtDongLai_CustomerPay: this.state.CustomerPay,
				LoanID: this.state.item.ID,
				StrFromDate: Utilities.instance().dateDDMMYYYY(this.props.getPaymentCustomizeReducer.data.FromDate),
				StrToDate: Utilities.instance().dateDDMMYYYY(this.props.getPaymentCustomizeReducer.data.ToDate),
				InterestMoney: this.state.InterestMoney,
				OtherMoney: this.state.OtherMoney,
				TotalInterest: this.state.TotalInterest,
				CustomerPay: this.state.CustomerPay
			};
			this.props.actionPaymentCustomizeAction(body);
		}
	};
	_view_tat_toan(item) {
		return item ? (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={styles.view_filter}>
						{this._view_key_value('Lãi từ ngày', Utilities.instance().dateDDMMYYYY(item.FromDate))}
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>Đến ngày *</TextHelvetica>
							<TouchableOpacity onPress={this.toggleStartDatePicker} style={styles.button_chose_code}>
								<Image
									source={ic_calendar_2}
									style={{
										height: 20 * Config.ratioHeight,
										width: 20 * Config.ratioHeight
									}}
									resizeMode="contain"
								/>
								{this.state.timeString ? (
									<TextHelvetica style={[ Style.text_style_bold ]}>
										{this.state.timeString}
									</TextHelvetica>
								) : (
									<TextHelvetica style={[ Style.text_style_normal, { color: '#B2B2B2' } ]}>
										Chọn thời gian
									</TextHelvetica>
								)}
							</TouchableOpacity>
						</View>
						{this._view_key_value('Ngày đóng lãi tiếp', Utilities.instance().dateDDMMYYYY(item.NextDate))}
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>Số ngày *</TextHelvetica>
							<TextInput
								value={this.state.TotalDays}
								maxLength={3}
								keyboardType="numeric"
								onChangeText={this.onChangeDay}
								style={[ styles.button_chose_code, { textAlign: 'right' } ]}
							/>
						</View>
						{this.state.TotalDays == 0 &&
						this.props.getPaymentCustomizeReducer.isSuccess && (
							<View style={styles.view_input}>
								<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]} />
								<TextHelvetica
									style={[
										Style.text_style_normal,
										{ flex: 1, color: 'red', textAlign: 'right', paddingTop: 5 }
									]}
								>
									Số ngày phải lớn hơn 0
								</TextHelvetica>
							</View>
						)}
						<View>
							{this._view_key_value_salary('Tiền lãi', this.state.InterestMoney, '#22BC9D')}
							<View style={styles.view_input}>
								<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
									Tiền khác *
								</TextHelvetica>
								<TextInput
									value={Utilities.instance().add_dot_number(this.state.OtherMoney)}
									maxLength={15}
									keyboardType="numeric"
									onChangeText={this.onChangeOtherMoney}
									style={[ styles.button_chose_code, { textAlign: 'right' } ]}
								/>
							</View>
							{this._view_key_value_salary('Tổng tiền lãi', this.state.TotalInterest, '#C41818')}
							<View style={styles.view_input}>
								<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
									Tiền khách đưa *
								</TextHelvetica>
								<TextInput
									value={Utilities.instance().add_dot_number(this.state.CustomerPay)}
									maxLength={15}
									keyboardType="numeric"
									onChangeText={this.onChangeCustomerPay}
									style={[ styles.button_chose_code, { textAlign: 'right' } ]}
								/>
							</View>
						</View>
					</View>
					<View style={{ padding: 20 }}>
						{!this.props.actionPaymentCustomizeReducer.isLoading ? (
							<MButtonSubmit onPress={this.action_payment} text="Đóng lãi" />
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

	uncheck = (PaymentID) => () => {
		var body = {
			LoanID: this.state.item.ID,
			PaymentID
		};
		this.setState({ PaymentID }, () => {
			this.props.deletePaymentAction(body);
		});
	};
	view_history = () => {
		const { data } = this.props.getHistoryPaymentReducer;
		if (data) {
			return (
				<View>
					{this.props.getHistoryPaymentReducer.data.map((item, index) => {
						return (
							<View key={index} style={styles.item}>
								<View style={styles.itemBoxHeader}>
									<TextHelvetica style={{ color: Style.textColor, fontSize: 16, flex: 1 }}>
										STT - {item.RowID}
									</TextHelvetica>
									<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
										<TextHelvetica
											style={{ color: Style.textColor, fontSize: 16, marginRight: 10 }}
										>
											Đã đóng lãi
										</TextHelvetica>
										<View
											style={{
												width: 22,
												justifyContent: 'center',
												alignItems: 'center',
												height: 22
											}}
										>
											{this.props.deletePaymentReducer.isLoading &&
											this.state.PaymentID == item.Id ? (
												<ActivityIndicator size="small" color="#34BFA3" />
											) : (
												<TouchableOpacity onPress={this.uncheck(item.Id)}>
													<FontAwesome5Pro
														name={'check-square'}
														size={22}
														color={'#34BFA3'}
													/>
												</TouchableOpacity>
											)}
										</View>
									</View>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Ngày</TextHelvetica>
									<TextHelvetica style={styles.itemBoxTextLeft}>
										{`${Utilities.instance().dateDDMMYYYY(item.FromDate)}` +
											` - ${Utilities.instance().dateDDMMYYYY(item.ToDate)}`}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Số ngày</TextHelvetica>
									<View style={{ flex: 1 }}>
										<TextHelvetica style={styles.itemBoxTextLeft}>{item.CountDate}</TextHelvetica>
									</View>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Tiền lãi</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{Utilities.instance().formatMoney(item.InterestMoney)} Đ
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Tiền khác</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{Utilities.instance().formatMoney(item.OtherMoney)} Đ
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Tổng lãi</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{Utilities.instance().formatMoney(item.PayNeed)} Đ
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Tiền khách trả</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{Utilities.instance().formatMoney(item.PayMoney)} Đ
									</TextHelvetica>
								</View>
							</View>
						);
					})}
				</View>
			);
		} else {
			return <View />;
		}
	};
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
						<TextHelvetica style={{ fontSize: 18, color: Style.textColorGray }}>
							Đóng tiền lãi
						</TextHelvetica>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<AnimatedScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.props.getPaymentCustomizeReducer.isLoading}
								onRefresh={this.getDataHistoryPayment}
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
						{this.state.filter == 0 ? (
							this._view_tat_toan(this.props.getPaymentCustomizeReducer.data)
						) : (
							this.view_history()
						)}
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
									{ label: 'Đóng lãi tùy biến', value: 0 },
									{ label: 'Lịch sử đóng tiền', value: 1 }
								]}
							/>
						</Animated.View>
					</Animated.View>
				</View>
				<DateTimePicker
					cancelTextIOS={'Huỷ'}
					confirmTextIOS={'Xác nhận'}
					titleIOS={'Chọn ngày giờ'}
					is24Hour={true}
					mode={'date'}
					date={new Date(this.state.to_date)}
					hideDateTimePicker={this.toggleStartDatePicker}
					handleDateTimePicker={this.handleStartDatePicker}
					isVisible={this.state.isVisibleStartDatePicker}
					minimumDate={
						this.props.getPaymentCustomizeReducer.isSuccess ? (
							new Date(new Date(this.props.getPaymentCustomizeReducer.data.FromDate))
						) : (
							new Date(new Date().getTime())
						)
					}
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
		getHistoryPaymentReducer: state.getHistoryPaymentReducer,
		getPaymentCustomizeReducer: state.getPaymentCustomizeReducer,
		actionPaymentCustomizeReducer: state.actionPaymentCustomizeReducer,
		deletePaymentReducer: state.deletePaymentReducer
	};
}

export default connect(mapStateToProps, {
	getHistoryPaymentAction,
	getPaymentCustomizeAction,
	actionPaymentCustomizeAction,
	deletePaymentAction
})(PayInterest);
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
