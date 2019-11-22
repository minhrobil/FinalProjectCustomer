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
import { getHistoryExtentionAction } from '../../../redux-saga/historyExtention';
import { actionExtentionAction } from '../../../redux-saga/actionExtention';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../../../components/customize/Table';
import { TextInput } from 'react-native-gesture-handler';
import MButtonSubmit from '../../../components/customize/MButtonSubmit';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const BORDER_RADIUS = 10;
const retangle_left = require('../../../assets/icons/retangle_left.png');
const retangle_right = require('../../../assets/icons/retangle_right.png');
class Extention extends React.Component {
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
			TimeExtend: '10',
			Note: '',
			filter: 0,
			item: this.props.navigation.state.params ? this.props.navigation.state.params.item : undefined,
			type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined
		};
	}
	componentDidMount() {
		this.getDataHistoryExtention();
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
		if (this.props.getHistoryExtentionReducer.isSuccess) {
		}
		if (this.props.actionExtentionReducer != PrevProps.actionExtentionReducer) {
			if (this.props.actionExtentionReducer.isSuccess) {
				showMessage({
					message: this.props.actionExtentionReducer.message,
					type: 'success',
					icon: 'success'
				});
				this.getDataHistoryExtention();
				this.props.getContractDetailAction(this.state.item.ID);
				this.setState({ TimeExtend: '10', Note: '' });
			}
			if (this.props.actionExtentionReducer.isError) {
				showMessage({
					message: this.props.actionExtentionReducer.message,
					type: 'danger',
					icon: 'danger'
				});
				this.getDataHistoryExtention();
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
	getDataHistoryExtention = () => {
		this.props.getHistoryExtentionAction(this.state.item.ID);
	};
	onChangeTimeExtend = (text) => {
		if (text[0] == '0') {
			this.setState({ TimeExtend: text.substring(1) });
		} else {
			this.setState({ TimeExtend: text });
		}
		if (text.length == 0) {
			this.setState({ TimeExtend: '0' });
		}
	};
	onChangeNote = (text) => {
		this.setState({ Note: text });
	};
	action_extention = () => {
		if (this.props.actionExtentionReducer.isLoading) {
		} else {
			var body = {
				txtGiaHan: this.state.TimeExtend,
				TimeExtend: this.state.TimeExtend,
				Note: this.state.Note,
				LoanID: this.state.item.ID
			};
			this.props.actionExtentionAction(body);
		}
	};
	_view_tat_toan() {
		return (
			<View style={{ paddingHorizontal: Config.PADDING_VERTICAL, marginBottom: 15 }}>
				<MShadowView style={{ borderRadius: 10 }}>
					<View style={styles.view_filter}>
						{this._view_key_value('Khách hàng', this.state.item.CustomerName)}
						<View style={styles.view_input}>
							<TextHelvetica style={[ Style.text_style_normal, { flex: 1 } ]}>
								Gia hạn thêm *
							</TextHelvetica>
							<View style={{ flex: 1.3, flexDirection: 'row' }}>
								<TextInput
									value={this.state.TimeExtend}
									maxLength={3}
									keyboardType="numeric"
									onChangeText={this.onChangeTimeExtend}
									style={[ styles.button_chose_code, { textAlign: 'right' } ]}
								/>
								<View style={styles.view_input_extension}>
									<TextHelvetica style={[ Style.text_style_normal, { fontStyle: 'italic' } ]}>
										Ngày
									</TextHelvetica>
								</View>
							</View>
						</View>
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
					</View>
					<View style={{ padding: 20 }}>
						{!this.props.actionExtentionReducer.isLoading ? (
							<MButtonSubmit onPress={this.action_extention} text="Gia hạn" />
						) : (
							<ActivityIndicator size="large" />
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
	view_history = () => {
		const { data } = this.props.getHistoryExtentionReducer;
		if (data) {
			return (
				<View>
					{this.props.getHistoryExtentionReducer.data.map((item, index) => {
						return (
							<View key={index} style={styles.item}>
								<View style={styles.itemBoxHeader}>
									<TextHelvetica style={{ color: Style.textColor, fontSize: 16, flex: 1 }}>
										STT - {index}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Gia hạn từ ngày</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{`${Utilities.instance().dateDDMMYYYY(item.OldDate)}`}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Đến ngày</TextHelvetica>
									<View style={{ flex: 1 }}>
										<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
											{`${Utilities.instance().dateDDMMYYYY(item.NewDate)}`}
										</TextHelvetica>
									</View>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Số ngày</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{item.CountDate}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Nội dung</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{`Gia hạn`}
									</TextHelvetica>
								</View>
								<View style={styles.itemBox}>
									<TextHelvetica style={styles.itemBoxTextRight}>Ghi chú</TextHelvetica>
									<TextHelvetica style={[ styles.itemBoxTextLeft, { fontWeight: 'bold' } ]}>
										{item.Note}
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
						<TextHelvetica style={{ fontSize: 18, color: Style.textColorGray }}>Gia hạn</TextHelvetica>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<AnimatedScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.props.getHistoryExtentionReducer.isLoading}
								onRefresh={this.getHistoryExtentionReducer}
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
								options={[ { label: 'Gia hạn', value: 0 }, { label: 'Lịch sử gia hạn', value: 1 } ]}
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
		getHistoryExtentionReducer: state.getHistoryExtentionReducer,
		actionExtentionReducer: state.actionExtentionReducer
	};
}

export default connect(mapStateToProps, {
	getContractDetailAction,
	getHistoryExtentionAction,
	actionExtentionAction
})(Extention);
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
