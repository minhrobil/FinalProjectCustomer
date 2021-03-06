import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import MView, { MView2 } from '../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles } from '../../Utilities/Styles';
import MButton from '../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';

import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import { ActivityIndicator } from 'react-native-paper';
import HeaderCommon from '../../components/customize/HeaderCommon';
import Utilities from '../../Utilities/Utilities';
import OneLine, { OneLineMedium } from '../../components/customize/OneLine';
import { width, height } from '../../components/customize/config/constant';
import { setCartLocalAction, deleteCartLocalAction } from '../../redux-saga/cartLocal';
import { createOrderAction } from '../../redux-saga/createOrder';
import { setUserInfoAction } from '../../redux-saga/userInfo';
import { checkTokenAction } from '../../redux-saga/checkToken';
import ModalProductDetail from '../../components/customize/ModalProductDetail';
import pencil from '../../assets/images/pencil.png';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
			isHideModalProductDetail: true,
			isVisibleModalProductDetail: false,
			customer_name: this.props.userInfoReducer.data ? this.props.userInfoReducer.data.user.name : '',
			customer_phone: this.props.userInfoReducer.data ? this.props.userInfoReducer.data.user.phone : '',
			// customer_address:
			// 	this.props.userInfoReducer.data && this.props.userInfoReducer.data.user.address
			// 		? this.props.userInfoReducer.data.user.address
			// 		: ''
			customer_address: '',
			customer_latitude: 0,
			customer_longitude: 0
		};
	}
	componentDidUpdate(PrevProps) {
		if (PrevProps.userInfoReducer != this.props.userInfoReducer) {
			if (this.props.userInfoReducer.data) {
				this.setState({
					customer_name: this.props.userInfoReducer.data.user.name,
					customer_phone: this.props.userInfoReducer.data.user.phone
					// customer_address: this.props.userInfoReducer.data.user.address
					// 	? this.props.userInfoReducer.data.user.address
					// 	: ''
				});
			}
		}
		if (PrevProps.createOrderReducer != this.props.createOrderReducer) {
			if (this.props.createOrderReducer.isSuccess) {
				this.alert.showAlert(this.props.createOrderReducer.message, () => {
					this.props.deleteCartLocalAction();
					this.props.checkTokenAction();
					this.props.navigation.goBack();
					this.props.navigation.dispatch(
						NavigationActions.navigate({ routeName: 'orders', params: { onRefresh: true } })
					);
				});
			} else {
				this.alert.showAlert(this.props.createOrderReducer.message, () => {});
			}
		}
		if (this.props.checkTokenReducer != PrevProps.checkTokenReducer) {
			if (this.props.checkTokenReducer.isSuccess) {
				this.props.setUserInfoAction(this.props.checkTokenReducer.data);
			}
		}
	}
	onChangeCustomerName = (text) => {
		this.setState({
			customer_name: text
		});
	};
	onChangeCustomerPhone = (text) => {
		this.setState({
			customer_phone: text
		});
	};
	view_input_customer_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.customer_name}
						placeholder="Nhập tên người nhận"
						onChangeText={this.onChangeCustomerName}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_customer_phone() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.customer_phone}
						placeholder="Nhập số điện thoại"
						onChangeText={this.onChangeCustomerPhone}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_customer_address() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<View style={[ styles.text_input, { flex: 3, justifyContent: 'center' } ]}>
						<TextPoppin
							style={[
								styles.text_content,
								{ color: this.state.customer_address == '' ? '#C7C7CD' : '#656565' }
							]}
						>
							{this.state.customer_address == '' ? 'Nhập địa chỉ nhận hàng' : this.state.customer_address}
						</TextPoppin>
					</View>
				</View>
			</MShadowView>
		);
	}
	_submit = () => {
		if (this.props.userInfoReducer.data) {
			if (this.state.customer_name == '') {
				this.alert.showAlert(`Tên người nhận không được để trống`, () => {});
			} else if (this.state.customer_address == '') {
				this.alert.showAlert(`Địa chỉ người nhận không được để trống`, () => {});
			} else if (this.state.customer_phone == '') {
				this.alert.showAlert(`Số điện thoại người nhận không được để trống`, () => {});
			} else {
				this.alert.showAlert(
					`Bạn có chắc chắn thông tin đặt hàng đã đúng? Đơn hàng sẽ được đặt ngay bây giờ?`,
					() => {
						var data = {
							customer_name: this.state.customer_name,
							customer_phone: this.state.customer_phone,
							customer_address: this.state.customer_address,
							customer_latitude: this.state.customer_latitude,
							customer_longitude: this.state.customer_longitude,
							products: JSON.stringify(this.props.cartLocalReducer.data)
						};
						console.log(data);
						setTimeout(() => {
							this.props.createOrderAction(data);
						}, 1000);
					},
					() => {}
				);
			}
		} else {
			this.alert.showAlert(
				`Bạn cần đăng nhập để đặt hàng`,
				() => {
					this.props.navigation.navigate('LoginScreen', { isOrder: true });
				},
				() => {}
			);
		}
	};
	openProductDetail = (product) => () => {
		this.setState({ isVisibleModalProductDetail: true, product });
	};
	goAutocompleteAddress = () => {
		this.props.navigation.navigate('AutocompleteAddress', {
			address: this.state.customer_address,
			action: (data) => {
				this.setState({
					customer_latitude: data.lat,
					customer_longitude: data.lng,
					customer_address: data.address
				});
			}
		});
	};
	count_total_price_cart = (cart) => {
		if (cart) {
			var total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
			return total;
		} else {
			return 0;
		}
	};
	render() {
		return (
			<MView2 statusbarColor={'white'}>
				<HeaderCommon
					title="Giỏ hàng của bạn"
					actionLeft={() => {
						this.props.navigation.goBack();
					}}
				/>
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL, flex: 1 }}
					>
						{this.props.cartLocalReducer.data ? (
							this.props.cartLocalReducer.data.map((item, index) => (
								<View>
									<View
										style={{
											flexDirection: 'row',
											padding: 10,
											backgroundColor: 'white',
											alignItems: 'center'
										}}
									>
										<View
											style={{
												width: 40,
												height: 40,
												justifyContent: 'center',
												alignItems: 'center',
												borderWidth: 1,
												borderRadius: 5,
												borderColor: Styles.backgroundColorHome
											}}
										>
											<TextPoppin style={[ styles.title, { color: Styles.primaryColor } ]}>
												{item.quantity}x
											</TextPoppin>
										</View>
										<View style={{ flex: 1, paddingHorizontal: 10 }}>
											<TextPoppin style={[ styles.title, {} ]}>{item.product.name}</TextPoppin>
										</View>
										<TouchableOpacity
											style={{ padding: 10 }}
											onPress={this.openProductDetail(item)}
										>
											<Icon name="pencil-alt" size={20} color={Styles.primaryColor} />
										</TouchableOpacity>
										<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
											{Utilities.instance().add_dot_number(item.product.price)} đ
										</TextPoppin>
									</View>
									{item.note ? (
										<View
											style={{
												flexDirection: 'row',
												paddingLeft: 10,
												backgroundColor: 'white',
												alignItems: 'center'
											}}
										>
											<TextPoppin style={[ styles.text_content, {} ]}>{item.note}</TextPoppin>
										</View>
									) : null}

									<View
										style={{
											flexDirection: 'row',
											padding: 10,
											backgroundColor: 'white',
											alignItems: 'center'
										}}
									>
										<OneLine />
									</View>
								</View>
							))
						) : null}
						{this.props.cartLocalReducer.data ? (
							<View
								style={{
									flexDirection: 'row',
									padding: 10,
									backgroundColor: 'white',
									alignItems: 'center'
								}}
							>
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TextPoppin style={[ styles.title, {} ]}>Tổng giá trị đơn hàng</TextPoppin>
								</View>
								<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
									{Utilities.instance().add_dot_number(
										this.count_total_price_cart(this.props.cartLocalReducer.data)
									)}{' '}
									đ
								</TextPoppin>
							</View>
						) : null}
						<OneLineMedium />
						{this.props.userInfoReducer.data && (
							<View style={{ padding: Config.PADDING_HORIZONTAL, backgroundColor: 'white' }}>
								<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>Tên người nhận *</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_customer_name()}</View>
								</View>
								<TouchableOpacity onPress={this.goAutocompleteAddress}>
									<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>
										Địa chỉ nhận hàng *
									</TextPoppin>

									<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
										<View style={{ flex: 3 }}>{this.view_input_customer_address()}</View>
									</View>
								</TouchableOpacity>
								<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>
									Số điện thoại người nhận *
								</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_customer_phone()}</View>
								</View>
							</View>
						)}

						<OneLineMedium height={150} />
					</ScrollView>
				</KeyboardAwareScrollView>
				<View
					style={{
						width: '100%',
						backgroundColor: 'white',
						padding: 10
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<View style={{ flex: 1, marginBottom: 10 }}>
							<TextPoppin style={[ styles.title, {} ]}>Tổng cộng</TextPoppin>
						</View>
						<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
							{Utilities.instance().add_dot_number(
								this.count_total_price_cart(this.props.cartLocalReducer.data)
							)}{' '}
							đ
						</TextPoppin>
					</View>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							height: 50,
							borderRadius: 5,
							backgroundColor: Styles.primaryColor
						}}
						onPress={this._submit}
					>
						{this.props.createOrderReducer.isLoading ? (
							<ActivityIndicator size="large" color={Styles.primaryColor} />
						) : (
							<TextPoppin style={[ styles.title, { color: 'white' } ]}>Đặt đơn hàng</TextPoppin>
						)}
					</TouchableOpacity>
				</View>
				<ModalProductDetail
					action_on_hide={() => this.setState({ isHideModalProductDetail: true })}
					action_on_show={() => this.setState({ isHideModalProductDetail: false })}
					action_cancel={() => this.setState({ isVisibleModalProductDetail: false })}
					isModalVisible={this.state.isVisibleModalProductDetail}
					data={this.state.product}
				/>

				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView2>
		);
	}
}

function mapStateToProps(state) {
	return {
		userInfoReducer: state.userInfoReducer,
		cartLocalReducer: state.cartLocalReducer,
		createOrderReducer: state.createOrderReducer,
		checkTokenReducer: state.checkTokenReducer
	};
}

export default connect(mapStateToProps, {
	setCartLocalAction,
	deleteCartLocalAction,
	createOrderAction,
	setUserInfoAction,
	checkTokenAction
})(Cart);

const styles = StyleSheet.create({
	mview_submit: { borderRadius: 40 },
	view_search: {
		borderRadius: 4
	},
	button_submit: {
		width: '105%',
		height: '105%'
	},
	title: {
		fontSize: Styles.fontSize,
		fontWeight: Config.os == 2 ? 'bold' : '500',
		color: '#3f3f3f',
		marginBottom: Config.os == 2 ? 5 : 1
	},
	text_content: {
		fontSize: Styles.fontSize - 1,
		color: '#3f3f3f',
		fontStyle: 'italic'
	},
	text_input: {
		width: '100%',
		height: Config.HEIGHT_TEXT_INPUT,
		// padding: 15,
		backgroundColor: 'white',
		// borderRadius: 3,
		// elevation: 3,
		// shadowColor: 'gray',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.1,
		color: '#656565',
		fontFamily: 'Poppins-Regular',
		fontSize: Styles.fontSize
	},
	imgBackground: {
		width: Config.widthDevice,
		height: Config.widthDevice * 1.36
	},
	logo: {
		width: Config.widthDevice * 0.6,
		height: Config.widthDevice * 0.4
	},
	containLogo: {
		alignItems: 'center',
		marginTop: 0
	},
	// boxInput: {
	// 	height: 50,
	// 	borderRadius: 5,
	// 	borderWidth: 1,
	// 	borderColor: '#D6D6D6',
	// 	width: Config.widthDevice - Config.widthDevice * 0.225,
	// 	flexDirection: 'row',
	// 	alignItems: 'center',
	// 	paddingLeft: 14,
	// 	paddingRight: 14
	// },
	input: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		color: Styles.textColor
	},
	btnLogin: {
		// marginTop: 30,
		// padding: 10,
		// elevation: 3,
		// shadowColor: '#969696',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.7,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnViewGradient: {
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnSignUp: {
		borderRadius: 5,
		width: Config.widthDevice - Config.widthDevice * 0.225,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
