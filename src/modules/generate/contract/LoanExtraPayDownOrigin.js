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

import { getContractDetailAction } from '../../../redux-saga/contractDetail';
import { getHistoryLoanExtraAction } from '../../../redux-saga/historyLoanExtra';
import { actionLoanExtraAction } from '../../../redux-saga/actionLoanExtra';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../../../components/customize/Table';
import { TextInput } from 'react-native-gesture-handler';
import MButtonSubmit from '../../../components/customize/MButtonSubmit';
import MAlert from '../../../components/customize/MAlert';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const BORDER_RADIUS = 10;
const retangle_left = require('../../../assets/icons/retangle_left.png');
const retangle_right = require('../../../assets/icons/retangle_right.png');
class LoanExtra extends React.Component {
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
			validate: true,

			TotalMoney: '0',
			Note: '',
			filter: 0,
			strDateExtra: Utilities.instance().dateDDMMYYYY(new Date()),
			date_extra: new Date(),
			item: this.props.navigation.state.params ? this.props.navigation.state.params.item : undefined,
			type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined
		};
	}
	componentDidMount() {
		this.getDataHistoryLoanExtra();
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
		if (this.props.getHistoryLoanExtraReducer.isSuccess) {
		}
		if (this.props.actionLoanExtraReducer != PrevProps.actionLoanExtraReducer) {
			if (this.props.actionLoanExtraReducer.isSuccess) {
				showMessage({
					message: this.props.actionLoanExtraReducer.message,
					type: 'success',
					icon: 'success'
				});
				this.getDataHistoryLoanExtra();
				this.props.getContractDetailAction(this.state.item.ID);
				this.setState({
					textChanged: false,
					TotalMoney: '0',
					Note: '',
					strDateExtra: Utilities.instance().dateDDMMYYYY(new Date()),
					date_extra: new Date()
				});
			}
			if (this.props.actionLoanExtraReducer.isError) {
				showMessage({
					message: this.props.actionLoanExtraReducer.message,
					type: 'danger',
					icon: 'danger'
				});
				this.getDataHistoryLoanExtra();
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
	getDataHistoryLoanExtra = () => {
		this.props.getHistoryLoanExtraAction(this.state.item.ID);
	};
	toggleStartDatePicker = (time) => {
		this.setState({ isVisibleStartDatePicker: !this.state.isVisibleStartDatePicker });
	};
	handleStartDatePicker = (time) => {
		var temp = new Date(time);
		var strDateExtra = Utilities.instance().dateDDMMYYYY(temp);
		this.setState({
			strDateExtra,
			isVisibleStartDatePicker: !this.state.isVisibleStartDatePicker,
			date_extra: time
		});
	};
	onChangeTotalMoney = (text) => {
		this.setState(
			{
				validate: this.validate()
			},
			() => {
				if (text[0] == '0') {
					this.setState({ TotalMoney: Utilities.instance().spend_dot_number(text.substring(1)) });
				} else {
					this.setState({ TotalMoney: Utilities.instance().spend_dot_number(text) });
				}
				if (text.length == 0) {
					this.setState({ TotalMoney: '0' });
				}
			}
		);
	};
	onChangeNote = (text) => {
		this.setState({ Note: text });
	};
	validate = () => {
		if (this.state.TotalMoney == 0) {
			return false;
		} else {
			return true;
		}
	};
	action_loan_extra = () => {
		this.setState(
			{
				validate: this.validate()
			},
			() => {
				if (this.state.validate) {
					if (this.props.actionLoanExtraAction.isLoading) {
					} else {
						var body = {
							Note: this.state.Note,
							LoanID: this.state.item.ID,
							ActionID: 5,
							TotalMoney: this.state.TotalMoney,
							strDateExtra: this.state.strDateExtra
						};
						this.props.actionLoanExtraAction(body);
					}
				}
			}
		);
	};
	_view_tat_toan() {
		return (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={[ styles.view_filter, {} ]}>
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
								Ngày trả trước gốc *
							</TextHelvetica>
							<View style={{ flex: 1.3, flexDirection: 'row' }}>
								<TouchableOpacity onPress={this.toggleStartDatePicker} style={styles.button_chose_code}>
									<Image
										source={ic_calendar_2}
										style={{
											height: 20 * Config.ratioHeight,
											width: 20 * Config.ratioHeight
										}}
										resizeMode="contain"
									/>
									{this.state.strDateExtra ? (
										<TextHelvetica style={[ Style.text_style_bold ]}>
											{this.state.strDateExtra}
										</TextHelvetica>
									) : (
										<TextHelvetica style={[ Style.text_style_normal, { color: '#B2B2B2' } ]}>
											Chọn thời gian
										</TextHelvetica>
									)}
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
								Số tiền gốc trả trước *
							</TextHelvetica>
							<View style={{ flex: 1.3, flexDirection: 'row' }}>
								<TextInput
									value={Utilities.instance().add_dot_number(this.state.TotalMoney)}
									maxLength={15}
									keyboardType="numeric"
									onChangeText={this.onChangeTotalMoney}
									style={[ styles.button_chose_code, { textAlign: 'right' } ]}
								/>
							</View>
						</View>
						{!this.state.validate && (
							<View style={styles.view_input}>
								<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]} />
								<TextHelvetica
									style={[
										Style.text_style_normal,
										{ flex: 1, color: 'red', textAlign: 'right', paddingTop: 5 }
									]}
								>
									Số tiền phải lớn hơn 0
								</TextHelvetica>
							</View>
						)}
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>Ghi chú</TextHelvetica>
							<View style={{ flex: 1.3, flexDirection: 'row' }}>
								<TextInput
									placeholder="Nhập thêm ghi chú"
									value={this.state.Note}
									multiline={true}
									onChangeText={this.onChangeNote}
									style={[
										styles.button_chose_code,
										{
											textAlignVertical: 'top',
											paddingTop: 10,
											// alignItems: 'flex-start',
											minHeight: 100 * Config.ratioHeight
										}
									]}
								/>
							</View>
						</View>
						<View style={{ padding: 20 }}>
							{!this.props.actionLoanExtraReducer.isLoading ? (
								<MButtonSubmit onPress={this.action_loan_extra} text="Đồng ý" />
							) : (
								<ActivityIndicator size="large" />
							)}
						</View>
					</View>
				</MShadowView>
			</View>
		);
	}
	view_origin_money() {
		return (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={[ styles.view_filter, {} ]}>
						{this._view_key_value_salary(
							'Tiền gốc còn lại',
							this.props.getContractDetailReducer.data.TotalMoneyCurrent,
							'#F4516C'
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
	delete_loan_extra = (LoanExtraID) => () => {
		var body = {
			LoanID: this.state.item.ID,
			ActionID: 7,
			ID: LoanExtraID
		};
		this.setState({ LoanExtraID }, () => {
			this.props.actionLoanExtraAction(body);
		});
	};
	_show_alert(message) {
		this.alert.showAlert(message, () => {}, false);
	}
	view_history = () => {
		const { data } = this.props.getHistoryLoanExtraReducer;
		if (data) {
			return (
				<View>
					{this.props.getHistoryLoanExtraReducer.data.map((item, index) => {
						return (
							<View key={index} style={styles.item}>
								<View style={styles.itemBoxHeader}>
									<TextHelvetica style={{ color: Style.textColor, fontSize: 16, flex: 1 }}>
										STT - {index}
									</TextHelvetica>
									<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
										<TextHelvetica
											style={{ color: Style.textColor, fontSize: 16, marginRight: 10 }}
										>
											Đã trả trước gốc
										</TextHelvetica>
										<View
											style={{
												width: 22,
												justifyContent: 'center',
												alignItems: 'center',
												height: 22
											}}
										>
											{this.props.actionLoanExtraReducer.isLoading &&
											this.state.LoanExtraID == item.ID ? (
												<ActivityIndicator size="small" color="#F4516C" />
											) : (
												<TouchableOpacity
													onPress={() =>
														this.alert.showAlert(
															'Bạn có chắc chắn muốn hủy thanh toán tiền gốc này không?',
															this.delete_loan_extra(item.ID),
															() => {}
														)}
												>
													<FontAwesome5Pro name={'times'} size={22} color={'#F4516C'} />
												</TouchableOpacity>
											)}
										</View>
									</View>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Thời gian</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{`${Utilities.instance().dateDDMMYYYY(item.DateExtra)}`}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Loại hình</TextHelvetica>
									<View style={{ flex: 1 }}>
										<TextHelvetica
											style={[
												styles.itemBoxTextLeft,
												{
													fontWeight: 'bold',
													color: item.TotalMoney > 0 ? '#34BFA3' : '#F4516C'
												}
											]}
										>
											{item.TotalMoney > 0 ? `Vay thêm tiền` : `Trả bớt gốc`}
										</TextHelvetica>
									</View>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Ghi chú</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{item.Note}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Số tiền</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{Utilities.instance().formatMoney(item.TotalMoney)} Đ
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
							Trả trước gốc
						</TextHelvetica>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<AnimatedScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.props.getHistoryLoanExtraReducer.isLoading}
								onRefresh={this.getHistoryLoanExtraReducer}
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

						{this.state.filter == 0 ? this._view_tat_toan() : this.view_history()}
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
									{ label: 'Trả bớt gốc', value: 0 },
									{ label: 'Danh sách tiền gốc', value: 1 }
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
					date={new Date(this.state.date_extra)}
					hideDateTimePicker={this.toggleStartDatePicker}
					handleDateTimePicker={this.handleStartDatePicker}
					isVisible={this.state.isVisibleStartDatePicker}
					minimumDate={new Date(new Date().getTime())}
					// maximumDate={new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000)}
				/>
				<DropdownAlert tapToCloseEnabled ref={(ref) => (this.dropDownAlertRef = ref)} />
				<FlashMessage hideStatusBar position="top" />
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
		getContractDetailReducer: state.getContractDetailReducer,
		getHistoryLoanExtraReducer: state.getHistoryLoanExtraReducer,
		actionLoanExtraReducer: state.actionLoanExtraReducer
	};
}

export default connect(mapStateToProps, {
	getContractDetailAction,
	getHistoryLoanExtraAction,
	actionLoanExtraAction
})(LoanExtra);
const styles = StyleSheet.create({
	view_input_extension: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginLeft: -5,
		backgroundColor: 'rgb(232,232,232)'
		// opacity: 0.5
	},
	view_input: {
		flexDirection: 'row',
		// alignItems: 'center',
		marginBottom: 10
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
